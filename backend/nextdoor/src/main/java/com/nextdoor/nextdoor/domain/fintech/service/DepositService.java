package com.nextdoor.nextdoor.domain.fintech.service;

import com.nextdoor.nextdoor.domain.fintech.client.SsafyApiClient;
import com.nextdoor.nextdoor.domain.fintech.domain.Account;
import com.nextdoor.nextdoor.domain.fintech.domain.Deposit;
import com.nextdoor.nextdoor.domain.fintech.domain.DepositStatus;
import com.nextdoor.nextdoor.domain.fintech.dto.DepositResponseDto;
import com.nextdoor.nextdoor.domain.fintech.dto.ReturnDepositRequestDto;
import com.nextdoor.nextdoor.domain.fintech.event.DepositCompletedEvent;
import com.nextdoor.nextdoor.domain.fintech.event.DepositHeldEvent;
import com.nextdoor.nextdoor.domain.fintech.repository.AccountRepository;
import com.nextdoor.nextdoor.domain.fintech.repository.DepositRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import org.springframework.transaction.support.TransactionTemplate;
import reactor.core.publisher.Mono;
import reactor.core.scheduler.Schedulers;

import java.time.LocalDateTime;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class DepositService {
    private final SsafyApiClient client;
    private final AccountRepository accountRepository;
    private final DepositRepository depositRepository;
    private final TransactionTemplate transactionTemplate;

    @Autowired
    private ApplicationEventPublisher eventPublisher;

    /**
     * 보증금 보관 (홀딩)
     */
    public Mono<Deposit> holdDeposit(
            String userKey,
            Long rentalId,
            String accountNo,
            int amount
    ) {
        // SSAFY 출금 API 호출
        return client.withdrawAccount(userKey, accountNo, amount, null)
                .flatMap(resp ->
                        Mono.fromCallable(() ->
                                transactionTemplate.execute(status -> {
                                    try {
                                        // 1) Account 조회 (가입된 계좌만)
                                        Account acct = accountRepository
                                                .findByMember_UserKeyAndAccountNo(userKey, accountNo)
                                                .orElseThrow(() -> new RuntimeException("등록 계좌 없음: " + accountNo));

                                        // 2) balance 차감
                                        acct.setBalance(acct.getBalance() - amount);
                                        accountRepository.save(acct);

                                        // 3) Deposit 생성·저장
                                        Deposit deposit = Deposit.builder()
                                                .rentalId(rentalId)
                                                .account(acct)
                                                .amount(amount)
                                                .status(DepositStatus.HELD)
                                                .heldAt(LocalDateTime.now())
                                                .build();
                                        Deposit saved = depositRepository.save(deposit);

                                        // 4) 이벤트 발행
                                        eventPublisher.publishEvent(
                                                DepositHeldEvent.builder()
                                                        .rentalId(rentalId)
                                                        .depositId(saved.getDepositId())
                                                        .build()
                                        );
                                        return saved;
                                    } catch (Exception e) {
                                        status.setRollbackOnly();
                                        throw e;
                                    }
                                })
                        ).subscribeOn(Schedulers.boundedElastic())
                );
    }

    /**
     * 보증금 반환
     */
    public Mono<DepositResponseDto> returnDeposit(ReturnDepositRequestDto req) {
        return Mono.fromCallable(() ->
                        // 1) Deposit 조회
                        depositRepository.findByRentalId(req.getRentalId())
                                .orElseThrow(() -> new RuntimeException("보증금 내역이 없습니다: rentalId=" + req.getRentalId()))
                )
                .flatMap(deposit -> {
                    // 2) 원금·차감액 계산
                    long original   = deposit.getAmount();
                    long deducted   = req.getDeductedAmount() == null ? 0 : req.getDeductedAmount();
                    long renterRefund = original - deducted;

                    String renterKey      = deposit.getAccount().getMember().getUserKey();
                    String renterAcctNo   = deposit.getAccount().getAccountNo();
                    String ownerKey       = req.getUserKey();
                    String ownerAcctNo    = req.getAccountNo();

                    // 3) SSAFY 환불 API 호출
                    Mono<Map<String,Object>> renterPay = client.depositAccount(
                            renterKey,
                            renterAcctNo,
                            renterRefund,
                            "보증금 반환"
                    );

                    // 4) SSAFY 차감 수익 API 호출 (차감액 > 0)
                    Mono<Map<String,Object>> ownerPay = deducted > 0
                            ? client.depositAccount(ownerKey, ownerAcctNo, deducted, "보증금 차감 수익")
                            : Mono.just(Map.of());

                    // 5) 순차 실행 후 DB 업데이트 & 이벤트 발행
                    return renterPay
                            .then(ownerPay)
                            .flatMap(__ -> Mono.fromCallable(() ->
                                    transactionTemplate.execute(status -> {
                                        try {
                                            // --- Deposit 상태 갱신 ---
                                            deposit.setDeductedAmount((int) deducted);
                                            deposit.setStatus(deducted > 0 ? DepositStatus.DEDUCTED : DepositStatus.RETURNED);
                                            deposit.setReturnedAt(LocalDateTime.now());
                                            depositRepository.save(deposit);

                                            // --- Account balance 동기화 ---
                                            // (a) 렌터 환불 반영
                                            Account renterAcct = accountRepository
                                                    .findByAccountNo(renterAcctNo)
                                                    .orElseThrow(() -> new RuntimeException("렌터 계좌 없음: " + renterAcctNo));
                                            renterAcct.setBalance(renterAcct.getBalance() + (int) renterRefund);
                                            accountRepository.save(renterAcct);

                                            // (b) 오너 차감 수익 반영
                                            if (deducted > 0) {
                                                Account ownerAcct = accountRepository
                                                        .findByAccountNo(ownerAcctNo)
                                                        .orElseThrow(() -> new RuntimeException("오너 계좌 없음: " + ownerAcctNo));
                                                ownerAcct.setBalance(ownerAcct.getBalance() + (int) deducted);
                                                accountRepository.save(ownerAcct);
                                            }

                                            // --- 이벤트 발행 ---
                                            eventPublisher.publishEvent(new DepositCompletedEvent(deposit.getRentalId()));

                                            // --- 응답 DTO 생성 ---
                                            return DepositResponseDto.builder()
                                                    .depositId(deposit.getDepositId())
                                                    .rentalId(deposit.getRentalId())
                                                    .amount(deposit.getAmount())
                                                    .status(deposit.getStatus())
                                                    .deductedAmount(deposit.getDeductedAmount())
                                                    .heldAt(deposit.getHeldAt())
                                                    .returnedAt(deposit.getReturnedAt())
                                                    .accountNo(renterAcctNo)
                                                    .bankCode(deposit.getAccount().getBankCode())
                                                    .build();
                                        } catch (Exception e) {
                                            status.setRollbackOnly();
                                            throw e;
                                        }
                                    })
                            ).subscribeOn(Schedulers.boundedElastic()))
                            .single();
                });
    }
}
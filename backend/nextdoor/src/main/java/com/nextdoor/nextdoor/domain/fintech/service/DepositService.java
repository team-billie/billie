package com.nextdoor.nextdoor.domain.fintech.service;

import com.nextdoor.nextdoor.domain.fintech.client.SsafyApiClient;
import com.nextdoor.nextdoor.domain.fintech.domain.*;
import com.nextdoor.nextdoor.domain.fintech.dto.DepositResponseDto;
import com.nextdoor.nextdoor.domain.fintech.dto.ReturnDepositRequestDto;
import com.nextdoor.nextdoor.domain.fintech.event.DepositCompletedEvent;
import com.nextdoor.nextdoor.domain.fintech.event.DepositHeldEvent;
import com.nextdoor.nextdoor.domain.fintech.repository.AccountRepository;
import com.nextdoor.nextdoor.domain.fintech.repository.DepositRepository;
import com.nextdoor.nextdoor.domain.fintech.repository.FintechUserRepository;
import com.nextdoor.nextdoor.domain.fintech.repository.RegistAccountRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import org.springframework.transaction.support.TransactionTemplate;
import reactor.core.publisher.Mono;
import reactor.core.scheduler.Schedulers;
import reactor.util.function.Tuples;

import java.time.LocalDateTime;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class DepositService {
    private final SsafyApiClient client;
    private final AccountRepository accountRepository;
    private final DepositRepository depositRepository;
    private final RegistAccountRepository registAccountRepository;
    private final FintechUserRepository fintechUserRepository;
    private final TransactionTemplate transactionTemplate;

    @Autowired
    private ApplicationEventPublisher eventPublisher;

    // 보증금 보관(홀딩)
    public Mono<Deposit> holdDeposit(
            String userKey,
            Long rentalId,
            String accountNo,
            int amount
    ) {
        // 보증금 보관이라 summary는 따로 없으니 null
        return client.withdrawAccount(userKey, accountNo, amount, null)
                .flatMap(resp ->
                        Mono.fromCallable(() -> {
                            // 명시적 트랜잭션 내에서 DB 업데이트와 이벤트 발행을 함께 처리
                            return transactionTemplate.execute(status -> {
                                try {
                                    // 1) 핀테크 사용자 유효성 검사
                                    FintechUser fu = fintechUserRepository.findById(userKey)
                                            .orElseThrow(() -> new RuntimeException("핀테크 사용자 없음"));

                                    // 2) 등록된 계좌(RegistAccount) 조회
                                    RegistAccount ra = registAccountRepository
                                            .findByUser_UserKeyAndAccount_AccountNo(userKey, accountNo)
                                            .orElseThrow(() -> new RuntimeException("등록 계좌 없음"));

                                    // 2-1) account 테이블에서 balance 차감
                                    Account acct = ra.getAccount();
                                    acct.setBalance(acct.getBalance() - amount);
                                    accountRepository.save(acct);

                                    // 2-2) regist_account 테이블에서도 balance 차감
                                    ra.setBalance(ra.getBalance() - amount);
                                    registAccountRepository.save(ra);

                                    // 3) Deposit 생성·저장
                                    Deposit d = Deposit.builder()
                                            .rentalId(rentalId)
                                            .registAccount(ra)
                                            .amount(amount)
                                            .status(DepositStatus.HELD)
                                            .heldAt(LocalDateTime.now())
                                            .build();
                                    Deposit savedDeposit = depositRepository.save(d);

                                    eventPublisher.publishEvent(DepositHeldEvent.builder()
                                            .rentalId(rentalId)
                                            .depositId(savedDeposit.getDepositId())
                                            .build());

                                    return savedDeposit;
                                } catch (Exception e) {
                                    status.setRollbackOnly();
                                    throw e;
                                }
                            });
                        }).subscribeOn(Schedulers.boundedElastic())
                );
    }

    //보증금 반환
    public Mono<DepositResponseDto> returnDeposit(ReturnDepositRequestDto req) {
        return Mono.fromCallable(() -> {
                    // 1) 보증금 내역 + 연관 RegistAccount(fetch join) 조회
                    Deposit d = depositRepository
                            .findWithAccount(req.getDepositId())      // @Query JOIN FETCH 적용된 메서드
                            .orElseThrow(() -> new RuntimeException("보증금 내역 없음"));

                    // 2) renterId → FintechUser.userKey 조회
                    FintechUser renterUser = fintechUserRepository
                            .findByUserId(req.getRenterId())
                            .orElseThrow(() -> new RuntimeException("핀테크 사용자 없음: renterId=" + req.getRenterId()));

                    // 세션이 열려 있을 때, 연관 필드에서 직접 꺼내 두기
                    String renterUserKey   = renterUser.getUserKey();
                    String renterAccountNo = d.getRegistAccount().getAccount().getAccountNo();
                    String bankCode        = d.getRegistAccount().getAccount().getBankCode();

                    // Tuple.of(d, accountNo, bankCode) 형태로 리턴
                    return Tuples.of(d, renterUserKey, renterAccountNo, bankCode);
                })
                .subscribeOn(Schedulers.boundedElastic())
                .publishOn(Schedulers.boundedElastic())
                // 2) 꺼내 둔 accountNo, bankCode 만 사용해서 API 호출
                .flatMap(tp -> {
                    Deposit d              = tp.getT1();
                    String renterUserKey   = tp.getT2();
                    String renterAccountNo = tp.getT3();
                    String bankCode        = tp.getT4();

                    long original     = d.getAmount();
                    long deducted     = req.getDeductedAmount() == null ? 0 : req.getDeductedAmount();
                    long renterRefund = original - deducted;

                    // 1) 렌터 환불 API 호출
                    Mono<Map<String,Object>> renterPay = client.depositAccount(
                            renterUserKey,
                            renterAccountNo,
                            renterRefund,
                            "보증금 반환(차감)"
                    );
                    // 2) 오너 차감 수익 API 호출 (차감액 > 0 일 때만)
                    Mono<Map<String,Object>> ownerPay = deducted > 0
                            ? client.depositAccount(
                            req.getUserKey(),
                            req.getAccountNo(),
                            deducted,
                            "보증금 차감 수익"
                    )
                            : Mono.just(Map.of());

                    // 3) API 순차 실행 → DB 업데이트 & 이벤트 발행
                    return renterPay
                            .then(ownerPay)
                            .flatMap(__ -> Mono.fromCallable(() -> {
                                // 명시적 트랜잭션 내에서 DB 업데이트와 이벤트 발행을 함께 처리
                                return transactionTemplate.execute(status -> {
                                    try {
                                        // --- 3-1) Deposit 엔티티 상태 변경 저장 ---
                                        d.setDeductedAmount((int) deducted);
                                        d.setStatus(deducted > 0
                                                ? DepositStatus.DEDUCTED
                                                : DepositStatus.RETURNED);
                                        d.setReturnedAt(LocalDateTime.now());
                                        depositRepository.save(d);

                                        // --- 3-2) 로컬 Account & RegistAccount balance 업데이트 ---

                                        // (a) 렌터 환불 반영
                                        Account renterAcct = accountRepository
                                                .findByAccountNo(renterAccountNo)
                                                .orElseThrow(() -> new RuntimeException("렌터 계좌 없음: " + renterAccountNo));
                                        renterAcct.setBalance(renterAcct.getBalance() + (int)renterRefund);
                                        accountRepository.save(renterAcct);

                                        RegistAccount renterRa = registAccountRepository
                                                .findByUser_UserKeyAndAccount_AccountNo(renterUserKey, renterAccountNo)
                                                .orElseThrow(() -> new RuntimeException("등록계좌 없음: " + renterAccountNo));
                                        renterRa.setBalance(renterRa.getBalance() + (int)renterRefund);
                                        registAccountRepository.save(renterRa);

                                        // (b) 오너 차감 수익 반영 (차감액 > 0)
                                        if (deducted > 0) {
                                            Account ownerAcct = accountRepository
                                                    .findByAccountNo(req.getAccountNo())
                                                    .orElseThrow(() -> new RuntimeException("오너 계좌 없음: " + req.getAccountNo()));
                                            ownerAcct.setBalance(ownerAcct.getBalance() + (int)deducted);
                                            accountRepository.save(ownerAcct);

                                            RegistAccount ownerRa = registAccountRepository
                                                    .findByUser_UserKeyAndAccount_AccountNo(req.getUserKey(), req.getAccountNo())
                                                    .orElseThrow(() -> new RuntimeException("오너 등록계좌 없음: " + req.getAccountNo()));
                                            ownerRa.setBalance(ownerRa.getBalance() + (int)deducted);
                                            registAccountRepository.save(ownerRa);
                                        }

                                        // --- 3-3) 이벤트 발행 ---
                                        DepositCompletedEvent event = new DepositCompletedEvent(d.getRentalId());
                                        eventPublisher.publishEvent(event);

                                        // --- 3-4) 응답 DTO 생성 ---
                                        return DepositResponseDto.builder()
                                                .depositId(d.getDepositId())
                                                .rentalId(d.getRentalId())
                                                .amount(d.getAmount())
                                                .status(d.getStatus())
                                                .deductedAmount(d.getDeductedAmount())
                                                .heldAt(d.getHeldAt())
                                                .returnedAt(d.getReturnedAt())
                                                .accountNo(renterAccountNo)
                                                .bankCode(bankCode)
                                                .build();
                                    } catch (Exception e) {
                                        status.setRollbackOnly();
                                        throw e;
                                    }
                                });
                            }).subscribeOn(Schedulers.boundedElastic()));
                });
    }
}
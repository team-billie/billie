package com.nextdoor.nextdoor.domain.fintech.service;

import com.nextdoor.nextdoor.domain.fintech.client.SsafyApiClient;
import com.nextdoor.nextdoor.domain.fintech.domain.Deposit;
import com.nextdoor.nextdoor.domain.fintech.domain.DepositStatus;
import com.nextdoor.nextdoor.domain.fintech.domain.FintechUser;
import com.nextdoor.nextdoor.domain.fintech.domain.RegistAccount;
import com.nextdoor.nextdoor.domain.fintech.dto.DepositResponseDto;
import com.nextdoor.nextdoor.domain.fintech.dto.ReturnDepositRequestDto;
import com.nextdoor.nextdoor.domain.fintech.event.DepositCompletedEvent;
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
    private final DepositRepository depositRepository;
    private final RegistAccountRepository registAccountRepository;
    private final FintechUserRepository fintechUserRepository;
    private final TransactionTemplate transactionTemplate; // 명시적 트랜잭션 관리를 위해 추가

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
        //Reactive WebFlux에서 JPA는 Schedulers.boundedElastic() 같은 스케줄러로 분리해 주는 게 안전
        return client.withdrawAccount(userKey, accountNo, amount, null)
                .flatMap(resp ->
                        Mono.fromCallable(() -> {
                            // 1) 핀테크 사용자 유효성 검사, fintechUser 를 userKey 로 조회
                            FintechUser fu = fintechUserRepository.findById(userKey)
                                    .orElseThrow(() -> new RuntimeException("핀테크 사용자 없음"));

                            // 2) 등록된 계좌(RegistAccount) 조회, RegistAccount 를 user.userKey + accountNo 로 조회
                            RegistAccount ra = registAccountRepository
                                    .findByUser_UserKeyAndAccount_AccountNo(userKey, accountNo)
                                    .orElseThrow(() -> new RuntimeException("등록 계좌 없음"));

                            // 3) Deposit 생성·저장
                            Deposit d = Deposit.builder()
                                    .rentalId(rentalId)
                                    .registAccount(ra)
                                    .amount(amount)
                                    .status(DepositStatus.HELD)
                                    .heldAt(LocalDateTime.now())
                                    .build();
                            return depositRepository.save(d);
                        }).subscribeOn(Schedulers.boundedElastic())
                );
    }

    //보증금 반환
    public Mono<DepositResponseDto> returnDeposit(ReturnDepositRequestDto req) {
        return Mono.fromCallable(() -> {
                    Deposit d = depositRepository.findByRentalId(req.getRentalId())
                            .orElseThrow(() -> new RuntimeException("해당 렌탈에 대한 보증금 내역이 없습니다"));

                    // 세션이 열려 있을 때, 연관 필드에서 직접 꺼내 두기
                    String accountNo = d.getRegistAccount().getAccount().getAccountNo();
                    String bankCode  = d.getRegistAccount().getAccount().getBankCode();

                    // Tuple.of(d, accountNo, bankCode) 형태로 리턴
                    return Tuples.of(d, accountNo, bankCode);
                })
                .subscribeOn(Schedulers.boundedElastic())
                .publishOn(Schedulers.boundedElastic())
                // 2) 꺼내 둔 accountNo, bankCode 만 사용해서 API 호출
                .flatMap(tp -> {
                    Deposit d         = tp.getT1();
                    String accountNo  = tp.getT2();
                    String bankCode   = tp.getT3();

                    long original     = d.getAmount();
                    long deducted     = req.getDeductedAmount() == null ? 0 : req.getDeductedAmount();
                    long renterRefund = original - deducted;

                    Mono<Map<String,Object>> renterPay = client.depositAccount(
                            req.getUserKey(),
                            accountNo,
                            renterRefund,
                            "보증금 반환(차감)"
                    );
                    Mono<Map<String,Object>> ownerPay = deducted > 0
                            ? client.depositAccount(
                            req.getOwnerUserKey(),
                            req.getOwnerAccountNo(),
                            deducted,
                            "보증금 차감 수익"
                    )
                            : Mono.just(Map.of());

                    // 3) API 순차 실행 → 엔티티 업데이트 & 저장 → DTO 생성
                    return renterPay
                            .then(ownerPay)
                            .flatMap(__ -> Mono.fromCallable(() -> {
                                // 명시적 트랜잭션 내에서 DB 업데이트와 이벤트 발행을 함께 처리
                                return transactionTemplate.execute(status -> {
                                    try {
                                        d.setDeductedAmount((int) deducted);
                                        d.setStatus(deducted > 0
                                                ? DepositStatus.DEDUCTED
                                                : DepositStatus.RETURNED);
                                        d.setReturnedAt(LocalDateTime.now());
                                        depositRepository.save(d);

                                        DepositCompletedEvent event = new DepositCompletedEvent(d.getRentalId());
                                        eventPublisher.publishEvent(event);

                                        // 프록시 대신 미리 꺼내 둔 accountNo, bankCode 사용
                                        return DepositResponseDto.builder()
                                                .depositId(d.getDepositId())
                                                .rentalId(d.getRentalId())
                                                .amount(d.getAmount())
                                                .status(d.getStatus())
                                                .deductedAmount(d.getDeductedAmount())
                                                .heldAt(d.getHeldAt())
                                                .returnedAt(d.getReturnedAt())
                                                .accountNo(accountNo)
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

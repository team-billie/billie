package com.nextdoor.nextdoor.domain.fintech.service;

import com.nextdoor.nextdoor.domain.fintech.client.SsafyApiClient;
import com.nextdoor.nextdoor.domain.fintech.domain.Deposit;
import com.nextdoor.nextdoor.domain.fintech.domain.DepositStatus;
import com.nextdoor.nextdoor.domain.fintech.domain.FintechUser;
import com.nextdoor.nextdoor.domain.fintech.domain.RegistAccount;
import com.nextdoor.nextdoor.domain.fintech.dto.ReturnDepositRequestDto;
import com.nextdoor.nextdoor.domain.fintech.repository.DepositRepository;
import com.nextdoor.nextdoor.domain.fintech.repository.FintechUserRepository;
import com.nextdoor.nextdoor.domain.fintech.repository.RegistAccountRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;
import reactor.core.scheduler.Schedulers;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class DepositService {
    private final SsafyApiClient client;
    private final DepositRepository depositRepository;
    private final RegistAccountRepository registAccountRepository;
    private final FintechUserRepository fintechUserRepository;

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
                            // fintechUser 를 userKey 로 조회
                            FintechUser fu = fintechUserRepository.findById(userKey)
                                    .orElseThrow(() -> new RuntimeException("핀테크 사용자 없음"));

                            // 2) RegistAccount 를 user.userKey + accountNo 로 조회
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
    public Mono<Deposit> returnDeposit(ReturnDepositRequestDto req) {
        return Mono.fromCallable(() ->
                        depositRepository.findById(req.getDepositId())
                                .orElseThrow(() -> new RuntimeException("보증금 내역 없음"))
                )
                .subscribeOn(Schedulers.boundedElastic())
                .publishOn(Schedulers.boundedElastic())
                .flatMap(d -> {
                    // 0) 금액 계산
                    long original = d.getAmount();
                    long deducted = req.getDeductedAmount() == null ? 0 : req.getDeductedAmount();
                    long renterRefund = original - deducted;

                    // 1) 렌터 환불
                    Mono<Map<String,Object>> renterPay = client.depositAccount(
                            req.getUserKey(),                          // 렌터 userKey
                            d.getRegistAccount().getAccount().getAccountNo(),
                            renterRefund,
                            "보증금 반환(차감)"
                    );
                    // 2) 오너 차감액 지급 (deducted>0 일 때만)
                    Mono<Map<String,Object>> ownerPay = deducted > 0
                            ? client.depositAccount(
                            req.getOwnerUserKey(),               // 오너 userKey
                            req.getOwnerAccountNo(),
                            deducted,
                            "보증금 차감 수익"
                    )
                            : Mono.just(Map.of());

                    // 3) 두 API 호출을 순차적으로 실행
                    return renterPay
                            .then(ownerPay)
                            .flatMap(__ -> Mono.fromCallable(() -> {
                                d.setDeductedAmount((int) deducted);
                                d.setStatus(deducted > 0
                                        ? DepositStatus.DEDUCTED
                                        : DepositStatus.RETURNED
                                );
                                d.setReturnedAt(LocalDateTime.now());
                                return depositRepository.save(d);
                            }).subscribeOn(Schedulers.boundedElastic()));
                });
    }
}
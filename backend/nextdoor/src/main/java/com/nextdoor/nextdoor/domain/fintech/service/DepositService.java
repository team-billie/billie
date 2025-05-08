package com.nextdoor.nextdoor.domain.fintech.service;

import com.nextdoor.nextdoor.domain.fintech.client.SsafyApiClient;
import com.nextdoor.nextdoor.domain.fintech.domain.Deposit;
import com.nextdoor.nextdoor.domain.fintech.domain.DepositStatus;
import com.nextdoor.nextdoor.domain.fintech.domain.FintechUser;
import com.nextdoor.nextdoor.domain.fintech.domain.RegistAccount;
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
                                    // 1. SSAFY userKey → FintechUser → plateforme userId(Long)
                                    FintechUser fu = fintechUserRepository.findById(userKey)
                                            .orElseThrow(() -> new RuntimeException("핀테크 사용자 없음"));
                                    Long platformUserId = fu.getUserId();

                                    // 2. 유저가 등록한 계좌(RegistAccount) 조회
                                    RegistAccount ra = registAccountRepository
                                            .findByUserIdAndAccount_AccountNo(platformUserId, accountNo)
                                            .orElseThrow(() -> new RuntimeException("등록 계좌 없음"));

                                    // 3. Deposit 엔티티 생성·저장
                                    Deposit d = Deposit.builder()
                                            .rentalId(rentalId)
                                            .registAccount(ra)
                                            .amount(amount)
                                            .status(DepositStatus.HELD)
                                            .heldAt(LocalDateTime.now())
                                            .build();
                                    return depositRepository.save(d);
                                })
                                .subscribeOn(Schedulers.boundedElastic())
                );
    }

    //보증금 반환
    public Mono<Deposit> returnDeposit(
            String userKey,
            Long depositId
    ) {
        return Mono.fromCallable(() ->
                        depositRepository.findById(depositId)
                                .orElseThrow(() -> new RuntimeException("보증금 내역 없음"))
                )
                .subscribeOn(Schedulers.boundedElastic())
                .publishOn(Schedulers.boundedElastic())
                .flatMap(d -> {
                    // 1) get platform userId
                    FintechUser fu = fintechUserRepository.findById(userKey)
                            .orElseThrow(() -> new RuntimeException("핀테크 사용자 없음"));
                    Long platformUserId = fu.getUserId();

                    // 2) SSAFY 입금 API 호출 (accountNo는 registAccount → Account → accountNo)
                    return client.depositAccount(
                                    userKey,
                                    d.getRegistAccount().getAccount().getAccountNo(),
                                    d.getAmount(),
                                    null
                            )
                            // 3) 상태 변경 및 저장
                            .flatMap(resp ->
                                    Mono.fromCallable(() -> {
                                                d.setStatus(DepositStatus.RETURNED);
                                                d.setReturnedAt(LocalDateTime.now());
                                                return depositRepository.save(d);
                                            })
                                            .subscribeOn(Schedulers.boundedElastic())
                            );
                });
    }
}
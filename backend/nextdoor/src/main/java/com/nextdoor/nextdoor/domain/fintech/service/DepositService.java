package com.nextdoor.nextdoor.domain.fintech.service;

import com.nextdoor.nextdoor.domain.fintech.client.SsafyApiClient;
import com.nextdoor.nextdoor.domain.fintech.domain.Deposit;
import com.nextdoor.nextdoor.domain.fintech.domain.DepositStatus;
import com.nextdoor.nextdoor.domain.fintech.repository.AccountRepository;
import com.nextdoor.nextdoor.domain.fintech.repository.DepositRepository;
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
    private final AccountRepository accountRepository;

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
                                    // 계좌 조회 + Deposit 생성 + 저장
                                    // accountNo→ID 매핑이 필요함
                                    Long acctId = accountRepository.findByAccountNumber(accountNo)
                                            .orElseThrow(() -> new RuntimeException("계좌 없음"))
                                            .getId();
                                    Deposit d = Deposit.builder()
                                            .rentalId(rentalId)
                                            .accountId(acctId)
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
    public Mono<Deposit> returnDeposit(String userKey, Long depositId) {
        // 1) 블로킹 조회를 boundedElastic 스케줄러로 분리
        return Mono.fromCallable(() ->
                        depositRepository.findById(depositId)
                                .orElseThrow(() -> new RuntimeException("보증금 내역 없음"))
                )
                .subscribeOn(Schedulers.boundedElastic())
                // 2) SSAFY 입금 API 호출
                .flatMap(d ->
                        client.depositAccount(
                                        userKey,
                                        getAccountNumber(d.getAccountId()),
                                        d.getAmount(),
                                        null
                                )
                                // 3) 다시 블로킹 save 를 boundedElastic 에서 처리
                                .flatMap(resp ->
                                        Mono.fromCallable(() -> {
                                                    d.setStatus(DepositStatus.RETURNED);
                                                    d.setReturnedAt(LocalDateTime.now());
                                                    return depositRepository.save(d);
                                                })
                                                .subscribeOn(Schedulers.boundedElastic())
                                )
                );
    }

    // accountId → accountNo 매핑 (AccountRepository 이용)
    private String getAccountNumber(Long accountId) {
        return accountRepository.findById(accountId)
                .orElseThrow(() -> new RuntimeException("계좌 없음"))
                .getAccountNumber(); //계좌 번호 반환
    }
}
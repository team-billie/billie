package com.nextdoor.nextdoor.domain.fintech.service;

import com.nextdoor.nextdoor.domain.fintech.client.SsafyApiClient;
import com.nextdoor.nextdoor.domain.fintech.domain.Deposit;
import com.nextdoor.nextdoor.domain.fintech.domain.DepositStatus;
import com.nextdoor.nextdoor.domain.fintech.repository.DepositRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class DepositService {
    private final SsafyApiClient client;
    private final DepositRepository repo;

    // 보증금 보관(홀딩)
    public Mono<Deposit> holdDeposit(String apiKey, String userKey, Long rentalId, Long accountId, int amount) {
        return client.withdraw(apiKey, userKey, accountId.toString(), amount)
                .map(resp -> {
                    Deposit d = Deposit.builder()
                            .rentalId(rentalId)
                            .accountId(accountId)
                            .amount(amount)
                            .status(DepositStatus.HELD)
                            .heldAt(LocalDateTime.now())
                            .build();
                    return repo.save(d);
                });
    }

    //보증금 반환
    public Mono<Deposit> returnDeposit(String apiKey, String userKey, Long depositId) {
        // 먼저 동기적으로 엔티티 조회
        Deposit d = repo.findById(depositId)
                .orElseThrow(() -> new RuntimeException("보증금 내역 없음"));

        // 입금 API 호출 후 map으로 상태 변경 & 저장
        return client.deposit(apiKey, userKey, d.getAccountId().toString(), d.getAmount())
                .map(resp -> {
                    d.setStatus(DepositStatus.RETURNED);
                    d.setReturnedAt(LocalDateTime.now());
                    return repo.save(d);
                });
    }

}
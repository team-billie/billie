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

    public Mono<Deposit> holdDeposit(String apiKey, String userKey, Long rentalId, Long accountId, int amount) {
        return client.withdraw(apiKey, userKey, accountId.toString(), amount)
                .flatMap(resp -> {
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
    
}
package com.nextdoor.nextdoor.domain.fintech.service;

import com.nextdoor.nextdoor.domain.fintech.client.SsafyApiClient;
import com.nextdoor.nextdoor.domain.fintech.domain.Account;
import com.nextdoor.nextdoor.domain.fintech.domain.FintechUser;
import com.nextdoor.nextdoor.domain.fintech.repository.AccountRepository;
import com.nextdoor.nextdoor.domain.fintech.repository.FintechUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

import java.time.LocalDateTime;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AccountService {
    private final SsafyApiClient client;
    private final AccountRepository repo;
    private final FintechUserRepository userRepo;

    //계좌 생성
    public Mono<Account> createAccount(String apiKey, String userKey, String accountTypeUniqueNo) {
        return client.createAccount(apiKey, userKey, accountTypeUniqueNo)
                .flatMap(resp -> {
                    Map<String,Object> map = resp;
                    FintechUser user = userRepo.findById(userKey)
                            .orElseThrow(() -> new RuntimeException("사용자 없음"));

                    Account acct = Account.builder()
                            .user(user)
                            .accountNumber((String) map.get("accountNumber"))
                            .bankCode((String) map.get("bankCode"))
                            .accountName((String) map.get("accountName"))
                            .createdAt(LocalDateTime.now())
                            .build();

                    return repo.save(acct);
                });
    }

    //계좌 입금(충전하기)
    public Mono<Void> deposit(String apiKey, String userKey, String accountNumber, int amount) {
        return client.deposit(apiKey, userKey, accountNumber, amount)
                .then();
    }

    //계좌 이체
    public Mono<Void> transfer(String apiKey, String userKey, String fromAccount, String toAccount, int amount) {
        return client.transfer(apiKey, userKey, fromAccount, toAccount, amount)
                .then();
    }

    //계좌 출금(보증금 관련)
    public Mono<Void> withdraw(String apiKey, String userKey, String accountNumber, int amount) {
        return client.withdraw(apiKey, userKey, accountNumber, amount)
                .then();
    }
}
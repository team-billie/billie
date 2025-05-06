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
    public Mono<Map<String, Object>> createAccount(String userKey, String accountTypeUniqueNo) {
        return client.createAccount(userKey, accountTypeUniqueNo)
                .map(resp -> {
                    // 1) SSAFY가 내려준 응답 그대로 resp(Map)을 리턴하기 전, DB에 persistence
                    String acctNo   = (String) resp.get("accountNo");     // or "accountNumber" field 이름 확인
                    String bankCode = (String) resp.get("bankCode");
                    String acctName = (String) resp.get("accountName");

                    // JPA로 블로킹 조회/저장
                    FintechUser user = userRepo.findById(userKey)
                            .orElseThrow(() -> new RuntimeException("사용자 없음"));

                    Account a = Account.builder()
                            .user(user)
                            .accountNumber(acctNo)
                            .bankCode(bankCode)
                            .accountName(acctName)
                            .createdAt(LocalDateTime.now())
                            .build();
                    repo.save(a);  // 블로킹 저장

                    // 2) 원본 SSAFY 응답 Map 그대로 리턴
                    return resp;
                });
    }

    //계좌 목록 조회
    public Mono<Map<String,Object>> inquireAccountList(String userKey) {
        return client.inquireAccountList(userKey);
    }

    //계좌 입금(충전하기)
    public Mono<Map<String,Object>> depositAccount(String userKey, String accountNo, long transactionBalance, String transactionSummary) {
        return client.depositAccount(userKey, accountNo, transactionBalance, transactionSummary)
                .map(resp -> {
                    return resp; // 성공 시 DB에 Transaction 기록이 필요하면 여기서 repo.save(...) 등 추가
                });
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
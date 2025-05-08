package com.nextdoor.nextdoor.domain.fintech.service;

import com.nextdoor.nextdoor.domain.fintech.client.SsafyApiClient;
import com.nextdoor.nextdoor.domain.fintech.domain.Account;
import com.nextdoor.nextdoor.domain.fintech.domain.FintechUser;
import com.nextdoor.nextdoor.domain.fintech.repository.AccountRepository;
import com.nextdoor.nextdoor.domain.fintech.repository.FintechUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;
import reactor.core.scheduler.Schedulers;

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
                .flatMap(resp -> {
                    // 1) SSAFY 응답에서 실제 생성된 계좌번호 필드명 확인
                    //여기서 발생할 수 있는 unchecked 경고(경고 코드: unchecked)를 무시해 달라”는 지시문
                    @SuppressWarnings("unchecked")
                    Map<String,Object> rec = (Map<String,Object>) resp.get("REC");
                    if (rec == null) {
                        return Mono.error(new RuntimeException("SSAFY 계좌 생성 응답에 REC가 없습니다."));
                    }
                    String acctNo   = rec.get("accountNo").toString();
                    String bankCode = rec.get("bankCode").toString();

                    // 2) FintechUser 조회 & Account 엔티티 생성·저장
                    return Mono.fromCallable(() -> {
                                FintechUser user = userRepo.findById(userKey)
                                        .orElseThrow(() -> new RuntimeException("사용자 없음"));

                                Account a = Account.builder()
                                        .accountNo(acctNo)
                                        .bankCode(bankCode)
                                        .balance(0)
                                        .createdAt(LocalDateTime.now())
                                        .user(user)      // 연관관계 바인딩
                                        .build();

                                // 블로킹 JPA 호출
                                return repo.save(a);
                            })
                            .subscribeOn(Schedulers.boundedElastic())
                            // 3) 저장 완료 후에도 SSAFY 원본 Map 그대로 흘려줌
                            .thenReturn(resp);
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
    public Mono<Map<String,Object>> transferAccount(String userKey, String depositAccountNo, long transactionBalance, String withdrawalAccountNo, String depositTransactionSummary, String withdrawalTransactionSummary) {
        return client.transferAccount( userKey, depositAccountNo, transactionBalance, withdrawalAccountNo, depositTransactionSummary, withdrawalTransactionSummary)
                .map(resp -> {
                    return resp;  // 필요시 DB 기록 로직 추가 (repo.save 등)
                });
    }

    //계좌 출금(보증금 관련)
    public Mono<Map<String,Object>> withdrawAccount(String userKey, String accountNo, long transactionBalance, String transactionSummary) {
        return client.withdrawAccount(userKey, accountNo, transactionBalance, transactionSummary)
                .map(resp -> {
                    // 필요시 DB 기록 로직 추가 가능
                    return resp;
                });
    }
}
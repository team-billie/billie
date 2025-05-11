package com.nextdoor.nextdoor.domain.fintech.service;

import com.nextdoor.nextdoor.domain.fintech.client.SsafyApiClient;
import com.nextdoor.nextdoor.domain.fintech.domain.Account;
import com.nextdoor.nextdoor.domain.fintech.domain.FintechUser;
import com.nextdoor.nextdoor.domain.fintech.domain.RegistAccount;
import com.nextdoor.nextdoor.domain.fintech.event.RemittanceCompletedEvent;
import com.nextdoor.nextdoor.domain.fintech.repository.AccountRepository;
import com.nextdoor.nextdoor.domain.fintech.repository.FintechUserRepository;
import com.nextdoor.nextdoor.domain.fintech.repository.RegistAccountRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;
import reactor.core.scheduler.Schedulers;

import java.time.LocalDateTime;
import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
public class AccountService {
    private final SsafyApiClient client;
    private final AccountRepository accountRepository;
    private final FintechUserRepository fintechUserRepository;
    private final RegistAccountRepository registAccountRepository;
    private ApplicationEventPublisher eventPublisher;

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
                                FintechUser user = fintechUserRepository.findById(userKey)
                                        .orElseThrow(() -> new RuntimeException("사용자 없음"));

                                Account a = Account.builder()
                                        .accountNo(acctNo)
                                        .bankCode(bankCode)
                                        .balance(0)
                                        .createdAt(LocalDateTime.now())
                                        .user(user)      // 연관관계 바인딩
                                        .build();

                                // 블로킹 JPA 호출
                                return accountRepository.save(a);
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
                .flatMap(resp ->
                        // 1) SSAFY 입금 API 호출이 성공했으면
                        Mono.fromCallable(() -> {
                                    // 2) 로컬 DB에서 accountNo에 해당하는 계좌 가져오기
                                    Account acct = accountRepository.findByAccountNo(accountNo)
                                            .orElseThrow(() -> new RuntimeException("계좌 없음: " + accountNo));
                                    // 3) balance 업데이트
                                    int updatedBalance = acct.getBalance() + (int) transactionBalance;
                                    acct.setBalance(updatedBalance);
                                    // 4) 저장
                                    accountRepository.save(acct);

                                    // 5) regist_account 테이블에서도 동일하게 balance 갱신
                                    RegistAccount ra = registAccountRepository
                                            .findByUser_UserKeyAndAccount_AccountNo(userKey, accountNo)
                                            .orElseThrow(() -> new RuntimeException("등록 계좌 없음: " + accountNo));
                                    ra.setBalance(updatedBalance);
                                    registAccountRepository.save(ra);

                                    // 6) 원본 SSAFY 응답 Map 그대로 리턴
                                    return resp;

                                })
                                .subscribeOn(Schedulers.boundedElastic())   // JPA 블로킹 호출은 별도 스케줄러에서
                                // 5) 저장이 끝나면 원본 SSAFY resp Map을 그대로 흘려보냄
                                .thenReturn(resp)
                );
    }

    //계좌 이체
    public Mono<Map<String,Object>> transferAccount(String userKey, String depositAccountNo, long transactionBalance, String withdrawalAccountNo, String depositTransactionSummary, String withdrawalTransactionSummary) {
        return client.transferAccount( userKey, depositAccountNo, transactionBalance, withdrawalAccountNo, depositTransactionSummary, withdrawalTransactionSummary)
                .flatMap(resp ->
                        Mono.fromCallable(() -> {
                                    // 1) 출금 계좌 조회
                                    Account withdrawAcct = accountRepository.findByAccountNo(withdrawalAccountNo)
                                            .orElseThrow(() -> new RuntimeException("출금 계좌 없음: " + withdrawalAccountNo));
                                    int newWithdrawBalance = withdrawAcct.getBalance() - (int)transactionBalance;
                                    withdrawAcct.setBalance(newWithdrawBalance);
                                    accountRepository.save(withdrawAcct);
                                    // 2) 입금 계좌 조회
                                    Account depositAcct = accountRepository.findByAccountNo(depositAccountNo)
                                            .orElseThrow(() -> new RuntimeException("입금 계좌 없음: " + depositAccountNo));
                                    int newDepositBalance = depositAcct.getBalance() + (int)transactionBalance;
                                    depositAcct.setBalance(newDepositBalance);
                                    accountRepository.save(depositAcct);

                                    // 3) regist_account balance 동기화 (출금측)
                                    registAccountRepository.findByUser_UserKeyAndAccount_AccountNo(userKey, withdrawalAccountNo)
                                            .ifPresent(ra -> {
                                                ra.setBalance(newWithdrawBalance);
                                                registAccountRepository.save(ra);
                                            });

                                    // 4) regist_account balance 동기화 (입금측)
                                    registAccountRepository.findByUser_UserKeyAndAccount_AccountNo(userKey, depositAccountNo)
                                            .ifPresent(ra -> {
                                                ra.setBalance(newDepositBalance);
                                                registAccountRepository.save(ra);
                                            });

                                    // 5) 원본 SSAFY 응답 Map 반환
                                    return resp;

                                })
                                .subscribeOn(Schedulers.boundedElastic())
                );
    }

    //계좌 출금(보증금 관련)
    public Mono<Map<String,Object>> withdrawAccount(String userKey, String accountNo, long transactionBalance, String transactionSummary) {
        return client.withdrawAccount(userKey, accountNo, transactionBalance, transactionSummary)
                .flatMap(resp ->
                        Mono.fromCallable(() -> {
                                    // 1) 로컬 DB에서 계좌 조회
                                    Account acct = accountRepository.findByAccountNo(accountNo)
                                            .orElseThrow(() -> new RuntimeException("계좌 없음: " + accountNo));
                                    // 2) 출금 금액만큼 balance 차감
                                    int updatedBalance = acct.getBalance() - (int) transactionBalance;
                                    acct.setBalance(updatedBalance);
                                    // 3) 변경된 엔티티 저장
                                    accountRepository.save(acct);

                                    // 4) 등록계좌(RegistAccount) balance 도 동기화
                                    RegistAccount ra = registAccountRepository
                                            .findByUser_UserKeyAndAccount_AccountNo(userKey, accountNo)
                                            .orElseThrow(() -> new RuntimeException("등록 계좌 없음: " + accountNo));
                                    ra.setBalance(updatedBalance);
                                    registAccountRepository.save(ra);

                                    //5) 원본 SSAFY 응답 Map 그대로 리턴
                                    return resp;
                                })
                                .subscribeOn(Schedulers.boundedElastic())
                                // 4) 저장이 완료되면 원본 SSAFY 응답(Map) 반환
                                .thenReturn(resp)
                );
    }


    // 결제 처리 (rentalId 추가)
    public Mono<Map<String,Object>> paymentAccount(
            String userKey,
            String depositAccountNo,
            long transactionBalance,
            String withdrawalAccountNo,
            String depositTransactionSummary,
            String withdrawalTransactionSummary,
            Long rentalId
    ) {
        return transferAccount(
                userKey,
                depositAccountNo,
                transactionBalance,
                withdrawalAccountNo,
                depositTransactionSummary,
                withdrawalTransactionSummary
        )
                .flatMap(ssafyResp ->
                        // 블로킹 작업은 boundedElastic 스케줄러에서 처리
                        Mono.fromCallable(() -> {
                            
                                    // 송금 완료 후 이벤트 발행
                                    RemittanceCompletedEvent event = new RemittanceCompletedEvent(rentalId);

                                    log.info("결제 완료 – rentalId: {}, amount: {}", rentalId, transactionBalance);
                                    return ssafyResp;
                                })
                                .subscribeOn(Schedulers.boundedElastic())
                );
    }
}
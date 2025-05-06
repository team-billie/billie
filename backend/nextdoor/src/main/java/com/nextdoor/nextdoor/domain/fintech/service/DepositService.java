package com.nextdoor.nextdoor.domain.fintech.service;

import com.nextdoor.nextdoor.domain.fintech.client.SsafyApiClient;
import com.nextdoor.nextdoor.domain.fintech.domain.Deposit;
import com.nextdoor.nextdoor.domain.fintech.domain.DepositStatus;
import com.nextdoor.nextdoor.domain.fintech.repository.AccountRepository;
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
        return client.withdrawAccount(userKey, accountNo, amount, null)
                .map(resp -> {
                    Deposit d = Deposit.builder()
                            .rentalId(rentalId)
                            .accountId(depositRepository // accountNo→ID 매핑이 필요합니다.
                                    .findByAccountNumber(accountNo)
                                    .orElseThrow(() -> new RuntimeException("계좌 없음")).getId())
                            .amount(amount)
                            .status(DepositStatus.HELD)
                            .heldAt(LocalDateTime.now())
                            .build();
                    return depositRepository.save(d);
                });
    }

    //보증금 반환
    public Mono<Deposit> returnDeposit(
            String userKey,
            Long depositId
    ) {
        // 먼저 동기적으로 엔티티 조회
        Deposit d = depositRepository.findById(depositId)
                .orElseThrow(() -> new RuntimeException("보증금 내역 없음"));

        // 입금 API 호출 후 map으로 상태 변경 & 저장
        // 보증금 반환이라 summary는 null
        return client.depositAccount(userKey,
                        /*accountNo=*/ getAccountNumber(d.getAccountId()),
                        d.getAmount(),
                        null
                )
                .map(resp -> {
                    d.setStatus(DepositStatus.RETURNED);
                    d.setReturnedAt(LocalDateTime.now());
                    return depositRepository.save(d);
                });
    }

    // accountId → accountNo 매핑 (AccountRepository 이용)
    private String getAccountNumber(Long accountId) {
        return accountRepository.findById(accountId)
                .orElseThrow(() -> new RuntimeException("계좌 없음"))
                .getAccountNumber();
    }
}
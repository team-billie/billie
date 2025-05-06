package com.nextdoor.nextdoor.domain.fintech.dto;

import lombok.Data;

/**
 * 계좌 출금 요청용 DTO
 */
@Data
public class AccountWithdrawalRequestDto {
    private String userKey;            // SSAFY 발급 userKey
    private String accountNo;          // 출금 대상 계좌번호
    private long transactionBalance;   // 출금 금액
    private String transactionSummary; // 출금 내역 요약 (선택)
}
package com.nextdoor.nextdoor.domain.fintech.dto;

import lombok.Data;

/**
 * 계좌 입금 요청용 DTO
 */
@Data
public class AccountDepositRequestDto {
    private String userKey;             // SSAFY 발급 userKey
    private String accountNo;           // 입금 대상 계좌번호
    private long transactionBalance;    // 입금 금액
    private String transactionSummary;  // 입금 내역 요약 (선택)
}
package com.nextdoor.nextdoor.domain.fintech.dto;

import lombok.Data;

/**
 * 계좌 이체 요청용 DTO
 */
@Data
public class AccountTransferRequestDto {
    private String userKey;                     // SSAFY 발급 userKey
    private String depositAccountNo;            // 입금(받는) 계좌번호
    private long transactionBalance;            // 이체 금액
    private String withdrawalAccountNo;         // 출금(보내는) 계좌번호
    private String depositTransactionSummary;   // 입금계좌 거래 요약 (선택)
    private String withdrawalTransactionSummary;// 출금계좌 거래 요약 (선택)
}
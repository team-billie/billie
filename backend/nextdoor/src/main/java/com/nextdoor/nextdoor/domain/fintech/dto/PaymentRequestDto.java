package com.nextdoor.nextdoor.domain.fintech.dto;

import lombok.Data;

/**
 * 결제 요청용 DTO (rentalId 추가)
 */
@Data
public class PaymentRequestDto {
    private String userKey;                     // SSAFY 발급 userKey
    private String depositAccountNo;            // 입금(받는) 계좌번호
    private long transactionBalance;            // 이체 금액
    private String withdrawalAccountNo;         // 출금(보내는) 계좌번호
    private String depositTransactionSummary;   // 입금계좌 거래 요약 (선택)
    private String withdrawalTransactionSummary;// 출금계좌 거래 요약 (선택)
    private Long rentalId;                    // 결제와 관련된 rentalId
}

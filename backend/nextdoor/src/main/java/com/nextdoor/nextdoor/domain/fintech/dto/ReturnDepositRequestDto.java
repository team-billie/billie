package com.nextdoor.nextdoor.domain.fintech.dto;

import lombok.Data;

// 보증금 반환 Dto
@Data
public class ReturnDepositRequestDto {
    private Long renterId;           // 렌터의 내부 PK
    private Long depositId;          // 보증금 내역 PK
    private Long deductedAmount;     // 차감액 (없으면 0 또는 null)
    private String userKey;     // 오너의 SSAFY userKey
    private String accountNo;   // 오너가 받을 계좌번호
    private Long rentalId;           // 대여 내역 ID
}
package com.nextdoor.nextdoor.domain.fintech.dto;

import lombok.Data;

// 보증금 반환 Dto
@Data
public class ReturnDepositRequestDto {
    private String userKey;            // 렌터의 SSAFY userKey
    private Long depositId;
    private Long deductedAmount;       // 차감액 (없으면 0 또는 null)
    private String ownerUserKey;       // 오너의 SSAFY userKey 추가
    private String ownerAccountNo; //차감액을 받을 오너 계좌번호
    private Long rentalId;                    // 결제와 관련된 rentalId
}
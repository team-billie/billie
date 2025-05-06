package com.nextdoor.nextdoor.domain.fintech.dto;

import lombok.Data;

// 보증금 반환 Dto
@Data
public class ReturnDepositRequestDto {
    private String userKey;
    private Long depositId;
}
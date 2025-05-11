package com.nextdoor.nextdoor.domain.fintech.dto;

import lombok.Data;

@Data
// 계좌 생성 Dto
public class CreateAccountRequestDto {
    private String userKey;
    private String accountTypeUniqueNo;
}
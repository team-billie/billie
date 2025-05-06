package com.nextdoor.nextdoor.domain.fintech.dto;

import lombok.Data;

@Data
public class ReturnDepositRequestDto {
    private String userKey;
    private String apiKey;
    private Long depositId;
}
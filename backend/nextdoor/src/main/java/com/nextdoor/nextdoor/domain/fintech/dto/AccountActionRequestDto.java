package com.nextdoor.nextdoor.domain.fintech.dto;

import lombok.Data;

@Data
public class AccountActionRequestDto {
    private String userKey;
    private String apiKey;
    private String accountNumber;
    private int amount;
}
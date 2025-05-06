package com.nextdoor.nextdoor.domain.fintech.dto;

import lombok.Data;

@Data
public class HoldDepositRequestDto {
    private String userKey;
    private String apiKey;
    private Long rentalId;
    private Long accountId;
    private int amount;
}
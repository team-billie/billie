package com.nextdoor.nextdoor.domain.fintech.dto;

import lombok.Data;

@Data
public class TransferRequestDto {
    private String userKey;
    private String apiKey;
    private String fromAccount;
    private String toAccount;
    private int amount;
}
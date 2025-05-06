package com.nextdoor.nextdoor.domain.fintech.dto;

import lombok.Data;

@Data
public class CreateAccountRequest {
    private String userKey;
    private String apiKey;
    private String accountTypeUniqueNo;
}
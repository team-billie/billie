package com.nextdoor.nextdoor.domain.fintech.dto;

import lombok.Data;

@Data
public class CreateAccountRequestDto {
    private String userKey;
    private String accountTypeUniqueNo;
}
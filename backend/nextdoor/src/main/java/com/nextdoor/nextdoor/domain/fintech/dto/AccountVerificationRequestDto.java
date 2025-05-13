package com.nextdoor.nextdoor.domain.fintech.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class AccountVerificationRequestDto {
    private String accountNo;
    private String bankCode;
}
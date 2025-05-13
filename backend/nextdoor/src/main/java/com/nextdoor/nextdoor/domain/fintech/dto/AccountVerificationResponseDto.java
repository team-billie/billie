package com.nextdoor.nextdoor.domain.fintech.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
public class AccountVerificationResponseDto {
    private String accountNo;
    private String bankCode;
    private String nickname;
}
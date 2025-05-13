package com.nextdoor.nextdoor.domain.fintech.service;

import com.nextdoor.nextdoor.domain.fintech.dto.AccountVerificationRequestDto;
import com.nextdoor.nextdoor.domain.fintech.dto.AccountVerificationResponseDto;

import java.util.Optional;

public interface AccountVerificationService {
    /**
     * Verify if an account exists with the given account number and bank code
     * @param requestDto the request containing account number and bank code
     * @return the account verification response with account number, bank code, and nickname if found
     */
    Optional<AccountVerificationResponseDto> verifyAccount(AccountVerificationRequestDto requestDto);
}
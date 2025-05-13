package com.nextdoor.nextdoor.domain.fintech.service;

import com.nextdoor.nextdoor.domain.fintech.domain.Account;
import com.nextdoor.nextdoor.domain.fintech.dto.AccountVerificationRequestDto;
import com.nextdoor.nextdoor.domain.fintech.dto.AccountVerificationResponseDto;
import com.nextdoor.nextdoor.domain.fintech.port.FintechMemberQueryPort;
import com.nextdoor.nextdoor.domain.fintech.repository.AccountRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AccountVerificationServiceImpl implements AccountVerificationService {

    private final AccountRepository accountRepository;
    private final FintechMemberQueryPort fintechMemberQueryPort;

    @Override
    @Transactional(readOnly = true)
    public Optional<AccountVerificationResponseDto> verifyAccount(AccountVerificationRequestDto requestDto) {
        // Find account by account number and bank code
        Optional<Account> accountOpt = accountRepository.findByAccountNoAndBankCode(
                requestDto.getAccountNo(), 
                requestDto.getBankCode()
        );
        
        if (accountOpt.isEmpty()) {
            return Optional.empty();
        }
        
        Account account = accountOpt.get();
        
        // Get the member ID from the account's user
        Long memberId = account.getUser().getUserId();
        
        // Find the nickname of the member
        Optional<String> nicknameOpt = fintechMemberQueryPort.findNicknameById(memberId);
        
        if (nicknameOpt.isEmpty()) {
            return Optional.empty();
        }
        
        // Build and return the response
        return Optional.of(AccountVerificationResponseDto.builder()
                .accountNo(account.getAccountNo())
                .bankCode(account.getBankCode())
                .nickname(nicknameOpt.get())
                .build());
    }
}
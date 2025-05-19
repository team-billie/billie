package com.nextdoor.nextdoor.domain.fintech.service;

import com.nextdoor.nextdoor.domain.fintech.domain.Account;
import com.nextdoor.nextdoor.domain.fintech.dto.AccountVerificationRequestDto;
import com.nextdoor.nextdoor.domain.fintech.dto.AccountVerificationResponseDto;
import com.nextdoor.nextdoor.domain.fintech.repository.AccountRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AccountVerificationServiceImpl implements AccountVerificationService {

    private final AccountRepository accountRepository;

    /**
     * account_no, bank_code 로 계좌를 찾고,
     * 연관된 Member 엔티티에서 nickname 을 꺼내 DTO 로 반환
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<AccountVerificationResponseDto> verifyAccount(AccountVerificationRequestDto requestDto) {
        // 1) 계좌 조회
        Optional<Account> accountOpt = accountRepository.findByAccountNoAndBankCode(
                requestDto.getAccountNo(),
                requestDto.getBankCode()
        );

        if (accountOpt.isEmpty()) {
            return Optional.empty();
        }

        Account account = accountOpt.get();
        // 2) 연관된 Member 에서 nickname 꺼내기 (트랜잭션 내이므로 LAZY 로드 OK)
        String nickname = account.getMember().getNickname();

        // 3) DTO 생성
        AccountVerificationResponseDto dto = AccountVerificationResponseDto.builder()
                .accountNo(account.getAccountNo())
                .bankCode(account.getBankCode())
                .nickname(nickname)
                .build();

        return Optional.of(dto);
    }
}
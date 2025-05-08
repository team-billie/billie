package com.nextdoor.nextdoor.domain.fintech.service;

import com.nextdoor.nextdoor.domain.fintech.domain.RegistAccount;
import com.nextdoor.nextdoor.domain.fintech.dto.RegistAccountResponseDto;
import com.nextdoor.nextdoor.domain.fintech.repository.RegistAccountRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;
import reactor.core.scheduler.Schedulers;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RegistAccountService {
    private final RegistAccountRepository registAccountRepository;

    /**
     * 등록된 모든 계좌를 조회해서 DTO 리스트로 반환
     */
    public Mono<List<RegistAccountResponseDto>> getRegistAccounts(Long userId) {
        return Mono.fromCallable(() -> registAccountRepository.findByUserId(userId)
                        .stream()
                        .map(this::toDto)
                        .collect(Collectors.toList()))
                .subscribeOn(Schedulers.boundedElastic());
    }

    private RegistAccountResponseDto toDto(RegistAccount ra) {
        return new RegistAccountResponseDto(
                ra.getId(),
                ra.getAccount().getAccountNo(),
                ra.getAccount().getBankCode(),
                ra.getAccountType(),
                ra.getAlias(),
                ra.getPrimary(),
                ra.getBalance(),
                ra.getRegisteredAt()
        );
    }
}

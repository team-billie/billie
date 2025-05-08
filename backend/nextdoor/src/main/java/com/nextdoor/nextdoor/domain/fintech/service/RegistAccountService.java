package com.nextdoor.nextdoor.domain.fintech.service;

import com.nextdoor.nextdoor.domain.fintech.domain.Account;
import com.nextdoor.nextdoor.domain.fintech.domain.FintechUser;
import com.nextdoor.nextdoor.domain.fintech.domain.RegistAccount;
import com.nextdoor.nextdoor.domain.fintech.domain.RegistAccountType;
import com.nextdoor.nextdoor.domain.fintech.dto.RegistAccountRequestDto;
import com.nextdoor.nextdoor.domain.fintech.dto.RegistAccountResponseDto;
import com.nextdoor.nextdoor.domain.fintech.repository.AccountRepository;
import com.nextdoor.nextdoor.domain.fintech.repository.FintechUserRepository;
import com.nextdoor.nextdoor.domain.fintech.repository.RegistAccountRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;
import reactor.core.scheduler.Schedulers;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RegistAccountService {
    private final RegistAccountRepository registAccountRepository;
    private final AccountRepository accountRepository;
    private final FintechUserRepository fintechUserRepository;

    /**
     * 등록된 모든 계좌를 조회해서 DTO 리스트로 반환
     */
    public Mono<List<RegistAccountResponseDto>> getRegistAccounts(String userKey) {
        return Mono.fromCallable(() ->
                        registAccountRepository.findByUser_UserKey(userKey)
                                .stream()
                                .map(this::toDto)
                                .collect(Collectors.toList())
                )
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

    /**
     * 계좌 등록 (EXTERNAL 타입)
     */
    public Mono<RegistAccountResponseDto> registerAccount(RegistAccountRequestDto req) {
        return Mono.fromCallable(() -> {
                    // 1) 사용자 확인
                    FintechUser fu = fintechUserRepository.findById(req.getUserKey())
                            .orElseThrow(() -> new RuntimeException("핀테크 사용자 없음"));

                    // 2) SSAFY 계좌 확인(계좌번호+은행코드로 확인)
                    Account acct = accountRepository
                            .findByAccountNoAndBankCode(req.getAccountNo(), req.getBankCode())
                            .orElseThrow(() -> new RuntimeException(
                                    "계좌 없음 또는 은행코드 불일치: "
                                            + req.getAccountNo() + " / " + req.getBankCode()));

                    // 3) 이미 등록된 계좌인지 검사
                    registAccountRepository.findByUser_UserKeyAndAccount_AccountNo(req.getUserKey(), req.getAccountNo())
                            .ifPresent(ra -> { throw new RuntimeException("이미 등록된 계좌입니다."); });

                    // 4) 주계좌 여부 결정: EXTERNAL 중 기존 등록이 없으면 primary=true
                    List<RegistAccount> existing = registAccountRepository.findByUser_UserKey(req.getUserKey());
                    // 기존 등록 계좌 목록(existing)을 돌면서 외부 계좌(RegistAccountType.EXTERNAL)가 하나라도 있는지를 확인
                    boolean hasExternal = existing.stream()
                            .anyMatch(ra -> ra.getAccountType() == RegistAccountType.EXTERNAL);

                    //hasExternal 이 false라면(외부 계좌가 없었다면) isPrimary 는 true
                    //hasExternal 이 true라면(외부 계좌가 이미 하나 이상 있었다면) isPrimary 는 false
                    //간단하게 요약하면 외부 계좌가 하나도 없을 때만 이번 계좌를 주 계좌(primary)로 삼겠다 라는 뜻임
                    boolean isPrimary = !hasExternal;

                    // 5) 신규 RegistAccount 엔티티 생성
                    RegistAccount ra = RegistAccount.builder()
                            .user(fu)
                            .account(acct)
                            .accountType(RegistAccountType.EXTERNAL)
                            .alias(req.getAlias())
                            .primary(isPrimary)
                            .balance(acct.getBalance())
                            .registeredAt(LocalDateTime.now())
                            .build();

                    // 6) 저장 후 DTO 변환
                    RegistAccount saved = registAccountRepository.save(ra);
                    return new RegistAccountResponseDto(
                            saved.getId(),
                            saved.getAccount().getAccountNo(),
                            saved.getAccount().getBankCode(),
                            saved.getAccountType(),
                            saved.getAlias(),
                            saved.getPrimary(),
                            saved.getBalance(),
                            saved.getRegisteredAt()
                    );
                })
                .subscribeOn(Schedulers.boundedElastic());
    }
}

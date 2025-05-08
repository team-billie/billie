package com.nextdoor.nextdoor.domain.fintech.service;

import com.nextdoor.nextdoor.domain.fintech.client.SsafyApiClient;
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
import java.util.Map;

@Service
@RequiredArgsConstructor
public class RegistAccountService {
    private final RegistAccountRepository registAccountRepository;
    private final AccountRepository accountRepository;
    private final FintechUserRepository fintechUserRepository;
    private final SsafyApiClient client;

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

                    //return toDto(saved); 이걸로 return new RegistAccountResponseDto 대체할 수 있음
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

    /**
     * 빌리페이 (BILI_PAY)
     * 사용자 계정 생성 직후 자동 호출: 계좌 생성 & DB 저장 → RegistAccount 생성
     * 빌리페이 생성 메서드, 따로 api 는 필요없다. 계정 생성하고 service로 요청해서 만들면 끝
     */
    public Mono<RegistAccountResponseDto> createBilipay(String userKey) {
        // 1) SSAFY API 로 계좌 생성 (빌리페이 == 싸피은행)
        // 싸피은행 고유은행 번호를 넣어주면 된다.
        return client.createAccount(userKey, /* 빌리페이 고정 파라미터 */ "999-1-6c20074711854e")
                .flatMap(resp -> {
                    // 1) SSAFY 응답에서 실제 생성된 계좌번호 필드명 확인
                    //여기서 발생할 수 있는 unchecked 경고(경고 코드: unchecked)를 무시해 달라”는 지시문
                    @SuppressWarnings("unchecked")
                    Map<String,Object> rec = (Map<String,Object>)resp.get("REC");
                    if (rec == null) {
                        return Mono.error(new RuntimeException("SSAFY 계좌 생성 응답에 REC가 없습니다."));
                    }
                    String acctNo   = rec.get("accountNo").toString();
                    String bankCode = rec.get("bankCode").toString();

                    // 2) DB에 Account 저장 (blocking)
                    return Mono.fromCallable(() -> {
                                FintechUser fu = fintechUserRepository.findById(userKey)
                                        .orElseThrow(() -> new RuntimeException("핀테크 사용자 없음"));

                                Account a = Account.builder()
                                        .accountNo(acctNo)
                                        .bankCode(bankCode)
                                        .balance(0)                   // 새로 발급된 계좌 초기잔액
                                        .createdAt(LocalDateTime.now())
                                        .user(fu)
                                        .build();
                                a = accountRepository.save(a);

                                // 3) RegistAccount에 타입=BILI_PAY 로 등록
                                RegistAccount ra = RegistAccount.builder()
                                        .user(fu)
                                        .account(a)
                                        .accountType(RegistAccountType.BILI_PAY)
                                        .alias("빌리페이")
                                        .balance(a.getBalance())
                                        .primary(false)        // 빌리페이는 주계좌 될 수 없음
                                        .registeredAt(LocalDateTime.now())
                                        .build();
                                ra = registAccountRepository.save(ra);

                                return toDto(ra);
                            })
                            .subscribeOn(Schedulers.boundedElastic());
                });
    }

    /**
     * 주계좌 변경: 해당 EXTERNAL 계좌만 primary=true, 나머지는 false
     */
    public Mono<RegistAccountResponseDto> changePrimary(
            String userKey,
            Long targetRegistAccountId
    ) {
        return Mono.fromCallable(() -> {
                    // 1) 대상 RegistAccount 조회 및 검증
                    RegistAccount target = registAccountRepository.findById(targetRegistAccountId)
                            .orElseThrow(() -> new RuntimeException("등록 계좌 없음: " + targetRegistAccountId));
                    if (!target.getUser().getUserKey().equals(userKey)) {
                        throw new RuntimeException("권한 없음: 다른 사용자 계좌 변경 불가");
                    }
                    if (target.getAccountType() != RegistAccountType.EXTERNAL) {
                        throw new RuntimeException("빌리페이나 BILI_PAY는 주계좌로 설정할 수 없습니다.");
                    }

                    // 2) 해당 사용자 모든 EXTERNAL 계좌 조회
                    List<RegistAccount> externals = registAccountRepository.findByUser_UserKeyAndAccountType(userKey, RegistAccountType.EXTERNAL);
                    // 3) 기존 primary=false 처리
                    for (RegistAccount ra : externals) {
                        if (ra.getPrimary()) {
                            ra.setPrimary(false);
                            registAccountRepository.save(ra);
                        }
                    }
                    // 4) 대상 계좌 primary=true 처리
                    target.setPrimary(true);
                    target.setRegisteredAt(LocalDateTime.now()); // Optional: 갱신 시간
                    RegistAccount saved = registAccountRepository.save(target);
                    return toDto(saved);
                })
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

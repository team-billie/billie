package com.nextdoor.nextdoor.domain.fintech.controller;

import com.nextdoor.nextdoor.domain.fintech.client.SsafyApiException;
import com.nextdoor.nextdoor.domain.fintech.dto.*;
import com.nextdoor.nextdoor.domain.fintech.domain.*;
import com.nextdoor.nextdoor.domain.fintech.service.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/api/v1/fintechs")
@RequiredArgsConstructor
public class FintechController {
    private final FintechUserService userService;
    private final AccountService accountService;
    private final DepositService depositService;
    private final AccountVerificationService accountVerificationService;

    //계정 생성
    @PostMapping("/users")
    public Mono<ResponseEntity<Map<String,Object>>> createUser(@RequestBody CreateUserRequestDto req) {
        return userService.createUser(req.getUserId(), req.getSsafyApiEmail())
                .map(ResponseEntity::ok)
                .doOnError(e -> log.error("계정 생성 오류", e))
                .onErrorResume(SsafyApiException.class, ex -> {
                    // SSAFY가 준 원본 errorBody(Map)을 그대로 반환
                    return Mono.just(
                            ResponseEntity
                                    .status(ex.getStatus())
                                    .body(ex.getErrorBody())
                    );
                });
    }

    //계좌 생성
    @PostMapping("/accounts")
    public Mono<ResponseEntity<Map<String, Object>>> createAccount(@RequestBody CreateAccountRequestDto req) {
        return accountService.createAccount( req.getUserKey(), req.getAccountTypeUniqueNo())
                .map(ResponseEntity::ok)
                .doOnError(e -> log.error("계좌 생성 오류", e))
                .onErrorResume(SsafyApiException.class, ex -> {
                    // SSAFY가 준 원본 errorBody(Map)을 그대로 반환
                    return Mono.just(
                            ResponseEntity
                                    .status(ex.getStatus())
                                    .body(ex.getErrorBody())
                    );
                });
    }

    //계좌 목록 조회
    @PostMapping("/accounts/list")
    public Mono<ResponseEntity<Map<String,Object>>> inquireAccountList(
            @RequestBody InquireAccountListRequestDto req
    ) {
        return accountService.inquireAccountList(req.getUserKey())
                .map(ResponseEntity::ok)
                .doOnError(e -> log.error("계좌 목록 조회 오류", e))
                .onErrorResume(SsafyApiException.class, ex ->
                        Mono.just(ResponseEntity
                                .status(ex.getStatus())
                                .body(ex.getErrorBody())
                        )
                );
    }

    //계좌 입금
    @PostMapping("/accounts/deposit")
    public Mono<ResponseEntity<Map<String,Object>>> depositAccount(
            @RequestBody AccountDepositRequestDto req
    ) {
        return accountService.depositAccount(
                        req.getUserKey(),
                        req.getAccountNo(),
                        req.getTransactionBalance(),
                        req.getTransactionSummary()
                )
                .map(ResponseEntity::ok)
                .doOnError(e -> log.error("계좌 입금 오류", e))
                .onErrorResume(SsafyApiException.class, ex ->
                        Mono.just(ResponseEntity
                                .status(ex.getStatus())
                                .body(ex.getErrorBody())
                        )
                );
    }

    //계좌 이체
    @PostMapping("/accounts/transfer")
    public Mono<ResponseEntity<Map<String,Object>>> transferAccount(
            @RequestBody AccountTransferRequestDto req
    ) {
        return accountService.transferAccount(
                        req.getUserKey(),
                        req.getDepositAccountNo(),
                        req.getTransactionBalance(),
                        req.getWithdrawalAccountNo(),
                        req.getDepositTransactionSummary(),
                        req.getWithdrawalTransactionSummary()
                )
                .map(ResponseEntity::ok)
                .doOnError(e -> log.error("계좌 이체 오류", e))
                .onErrorResume(SsafyApiException.class, ex ->
                        Mono.just(ResponseEntity
                                .status(ex.getStatus())
                                .body(ex.getErrorBody())
                        )
                );
    }

    //계좌 출금
    @PostMapping("/accounts/withdraw")
    public Mono<ResponseEntity<Map<String,Object>>> withdrawAccount(
            @RequestBody AccountWithdrawalRequestDto req
    ) {
        return accountService.withdrawAccount(
                        req.getUserKey(),
                        req.getAccountNo(),
                        req.getTransactionBalance(),
                        req.getTransactionSummary()
                )
                .map(ResponseEntity::ok)
                .doOnError(e -> log.error("계좌 출금 오류", e))
                .onErrorResume(SsafyApiException.class, ex ->
                        Mono.just(ResponseEntity
                                .status(ex.getStatus())
                                .body(ex.getErrorBody())
                        )
                );
    }

    //보증금 보관
    @PostMapping("/deposits/hold")
    public Mono<ResponseEntity<Deposit>> holdDeposit(
            @RequestBody HoldDepositRequestDto req
    ) {
        return depositService.holdDeposit(
                        req.getUserKey(),
                        req.getRentalId(),
                        req.getAccountNo(),
                        req.getAmount()
                )
                .map(ResponseEntity::ok)
                .doOnError(e -> log.error("보증금 보관 오류", e))
                .onErrorResume(SsafyApiException.class, ex ->
                        Mono.just(ResponseEntity
                                .status(ex.getStatus())
                                .body(null)
                        )
                );
    }

    //보증금 반환
    @PostMapping("/deposits/return")
    public Mono<ResponseEntity<DepositResponseDto>> returnDeposit(
            @RequestBody ReturnDepositRequestDto req
    ) {
        return depositService.returnDeposit(req)
                .map(ResponseEntity::ok)
                .doOnError(e -> log.error("보증금 반환 오류", e))
                .onErrorResume(SsafyApiException.class, ex ->
                        Mono.just(ResponseEntity
                                .status(ex.getStatus())
                                .body(null)
                        )
                );
    }

    //계좌 확인
    @PostMapping("/accounts/verify")
    public ResponseEntity<AccountVerificationResponseDto> verifyAccount(
            @RequestBody AccountVerificationRequestDto req
    ) {
        return accountVerificationService.verifyAccount(req)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}

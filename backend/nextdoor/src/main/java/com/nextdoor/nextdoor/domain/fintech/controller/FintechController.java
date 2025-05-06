package com.nextdoor.nextdoor.domain.fintech.controller;

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
@RequestMapping("/api/v1/fintech")
@RequiredArgsConstructor
public class FintechController {
    private final FintechUserService userService;
    private final AccountService accountService;
    private final DepositService depositService;

    //계정 생성
    @PostMapping("/users")
    public Mono<ResponseEntity<Map<String,Object>>> createUser(
            @RequestBody CreateUserRequestDto req
    ) {
        return userService.createUser(req.getUserId())
                .map(ResponseEntity::ok)
                .doOnError(e -> log.error("회원가입 오류", e));
    }

    //계좌 생성
    @PostMapping("/accounts")
    public Mono<ResponseEntity<Account>> createAccount(@RequestBody CreateAccountRequestDto req) {
        return accountService.createAccount(
                        req.getUserKey(),
                        req.getAccountTypeUniqueNo()
                )
                .map(ResponseEntity::ok);
    }

    //계좌 입금
    @PostMapping("/accounts/deposit")
    public Mono<ResponseEntity<Void>> deposit(@RequestBody AccountActionRequestDto req) {
        return accountService.deposit(
                        req.getApiKey(),
                        req.getUserKey(),
                        req.getAccountNumber(),
                        req.getAmount()
                )
                .thenReturn(ResponseEntity.ok().<Void>build());
    }

    //계좌 이체
    @PostMapping("/accounts/transfer")
    public Mono<ResponseEntity<Void>> transfer(@RequestBody TransferRequestDto req) {
        return accountService.transfer(
                        req.getApiKey(),
                        req.getUserKey(),
                        req.getFromAccount(),
                        req.getToAccount(),
                        req.getAmount()
                )
                .thenReturn(ResponseEntity.ok().<Void>build());
    }

    //계좌 출금
    @PostMapping("/accounts/withdraw")
    public Mono<ResponseEntity<Void>> withdraw(@RequestBody AccountActionRequestDto req) {
        return accountService.withdraw(
                        req.getApiKey(),
                        req.getUserKey(),
                        req.getAccountNumber(),
                        req.getAmount()
                )
                .thenReturn(ResponseEntity.ok().<Void>build());
    }

    //보증금 보관
    @PostMapping("/deposits/hold")
    public Mono<ResponseEntity<Deposit>> holdDeposit(@RequestBody HoldDepositRequestDto req) {
        return depositService.holdDeposit(
                        req.getApiKey(),
                        req.getUserKey(),
                        req.getRentalId(),
                        req.getAccountId(),
                        req.getAmount()
                )
                .map(ResponseEntity::ok);
    }

    //보증금 반환
    @PostMapping("/deposits/return")
    public Mono<ResponseEntity<Deposit>> returnDeposit(@RequestBody ReturnDepositRequestDto req) {
        return depositService.returnDeposit(
                        req.getApiKey(),
                        req.getUserKey(),
                        req.getDepositId()
                )
                .map(ResponseEntity::ok);
    }
}
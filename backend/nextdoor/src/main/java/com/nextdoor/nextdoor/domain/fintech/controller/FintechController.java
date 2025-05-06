package com.nextdoor.nextdoor.domain.fintech.controller;

import com.nextdoor.nextdoor.domain.fintech.dto.*;
import com.nextdoor.nextdoor.domain.fintech.domain.*;
import com.nextdoor.nextdoor.domain.fintech.service.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/v1/fintech")
@RequiredArgsConstructor
public class FintechController {
    private final FintechUserService userService;
    private final AccountService accountService;
    private final DepositService depositService;

    //계정 생성
    @PostMapping("/users")
    public Mono<ResponseEntity<FintechUser>> createUser(@RequestBody CreateUserRequestDto req) {
        return userService.createUser(req.getEmail(), req.getApiKey())
                .map(ResponseEntity::ok);
    }

    //계좌 생성
    @PostMapping("/accounts")
    public Mono<ResponseEntity<Account>> createAccount(@RequestBody CreateAccountRequestDto req) {
        return accountService.createAccount(
                        req.getApiKey(),
                        req.getUserKey(),
                        req.getAccountTypeUniqueNo()
                )
                .map(ResponseEntity::ok);
    }

}
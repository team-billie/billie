package com.nextdoor.nextdoor.domain.fintech.controller;

import com.nextdoor.nextdoor.domain.fintech.dto.RegistAccountRequestDto;
import com.nextdoor.nextdoor.domain.fintech.dto.RegistAccountResponseDto;
import com.nextdoor.nextdoor.domain.fintech.service.RegistAccountService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

import java.util.List;

@RestController
@RequestMapping("/api/v1/fintechs")
@RequiredArgsConstructor
public class RegistAccountController {
    private final RegistAccountService registAccountService;

    /**
     * 등록된 계좌 목록 조회
     * GET /api/v1/fintechs/regist-accounts?userKey=123123123123
     */
    @GetMapping("/regist-accounts")
    public Mono<ResponseEntity<List<RegistAccountResponseDto>>> listRegistAccounts(
            @RequestParam("userKey") String userKey
    ) {
        return registAccountService.getRegistAccounts(userKey)
                .map(ResponseEntity::ok);
    }

    /**
     * 계좌 등록 API
     * POST /api/v1/fintechs/regist-accounts
     */
    @PostMapping("/regist-accounts")
    public Mono<ResponseEntity<RegistAccountResponseDto>> register(
            @RequestBody RegistAccountRequestDto req
    ) {
        return registAccountService.registerAccount(req)
                .map(ResponseEntity::ok)
                .onErrorResume(e -> Mono.just(
                        ResponseEntity.badRequest().build()
                ));
    }
}

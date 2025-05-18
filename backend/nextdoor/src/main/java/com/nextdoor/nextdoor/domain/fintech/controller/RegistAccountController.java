package com.nextdoor.nextdoor.domain.fintech.controller;

import com.nextdoor.nextdoor.domain.fintech.dto.RegistAccountRequestDto;
import com.nextdoor.nextdoor.domain.fintech.dto.RegistAccountResponseDto;
import com.nextdoor.nextdoor.domain.fintech.service.AccountService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/fintechs")
@RequiredArgsConstructor
public class RegistAccountController {
    private final AccountService accountService;

    /**
     * 등록된 계좌 목록 조회
     * GET /api/v1/fintechs/regist-accounts?userKey=...
     */
    @GetMapping("/regist-accounts")
    public Mono<ResponseEntity<List<RegistAccountResponseDto>>> listRegistAccounts(
            @RequestParam("userKey") String userKey
    ) {
        return accountService.getRegistAccounts(userKey)
                .map(ResponseEntity::ok);
    }

    /**
     * 외부 계좌 등록 (EXTERNAL)
     * POST /api/v1/fintechs/regist-accounts
     */
    @PostMapping("/regist-accounts")
    public Mono<ResponseEntity<Object>> registerAccount(
            @RequestBody RegistAccountRequestDto req
    ) {
        return accountService.registerAccount(req)
                .map(dto -> ResponseEntity.ok().<Object>body(dto))
                .onErrorResume(e -> {
                    Map<String,String> error = new HashMap<>();
                    error.put("error", e.getMessage());
                    return Mono.just(
                            ResponseEntity.badRequest().<Object>body(error)
                    );
                });
    }


    /**
     * 주계좌 변경
     * PUT /api/v1/fintechs/regist-accounts/primary?accountId=...&userKey=...
     */
    @PutMapping("/regist-accounts/primary")
    public Mono<ResponseEntity<Object>> changePrimary(
            @RequestParam("accountId") Long accountId,
            @RequestParam("userKey") String userKey
    ) {
        return accountService.changePrimary(userKey, accountId)
                .map(dto -> ResponseEntity.ok().<Object>body(dto))
                .onErrorResume(e -> {
                    Map<String, String> err = Map.of("error", e.getMessage());
                    return Mono.just(
                            ResponseEntity.badRequest().<Object>body(err)
                    );
                });
    }
}

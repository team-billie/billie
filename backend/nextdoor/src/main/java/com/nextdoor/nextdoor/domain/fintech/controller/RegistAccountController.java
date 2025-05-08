package com.nextdoor.nextdoor.domain.fintech.controller;

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
    private final RegistAccountService service;

    /**
     * 등록된 계좌 목록 조회
     * GET /api/v1/fintechs/regist-accounts?userId=123
     */
    @GetMapping("/regist-accounts")
    public Mono<ResponseEntity<List<RegistAccountResponseDto>>> listRegistAccounts(
            @RequestParam("userId") Long userId
    ) {
        return service.getRegistAccounts(userId)
                .map(ResponseEntity::ok);
    }
}

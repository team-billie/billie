package com.nextdoor.nextdoor.domain.fintech.controller;

import com.nextdoor.nextdoor.domain.fintech.dto.RegistAccountRequestDto;
import com.nextdoor.nextdoor.domain.fintech.dto.RegistAccountResponseDto;
import com.nextdoor.nextdoor.domain.fintech.service.RegistAccountService;
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
    public Mono<ResponseEntity<Object>> registerAccount(
            @RequestBody RegistAccountRequestDto req
    ) {
        return registAccountService.registerAccount(req)
                // 성공 시: DTO 를 Object 로 body 에 담기
                .map(dto -> ResponseEntity
                        .ok()
                        .<Object>body(dto)
                )
                // 실패 시: error Map 을 Object 로 body 에 담기
                .onErrorResume(e -> {
                    Map<String,String> error = new HashMap<>();
                    error.put("error", e.getMessage());
                    return Mono.just(
                            ResponseEntity
                                    .badRequest()
                                    .<Object>body(error)
                    );
                });
    }

    /**
     * 주계좌 변경
     * PUT /api/v1/fintechs/regist-accounts/primary?registAccountId=1&userKey=5b4e4cb4-c670-4ba9-96c9-ec191910005b
     */
    @PutMapping("/regist-accounts/primary")
    public Mono<ResponseEntity<Object>>  changePrimary(
            @RequestParam("registAccountId") Long registAccountId,
            @RequestParam("userKey") String userKey
    ) {
        return registAccountService.changePrimary(userKey, registAccountId)
                // 성공 시: DTO
                .map(dto -> ResponseEntity.ok().<Object>body(dto))
                // 그 외 예외는 400 + 메시지 JSON
                .onErrorResume(e -> {
                    Map<String, String> err = Map.of("error", e.getMessage());
                    return Mono.just(
                            ResponseEntity
                                    .badRequest()
                                    .<Object>body(err)
                    );
                });
    }
}

package com.nextdoor.nextdoor.domain.fintech.controller;

import com.nextdoor.nextdoor.domain.fintech.client.SsafyApiException;
import com.nextdoor.nextdoor.domain.fintech.dto.PaymentRequestDto;
import com.nextdoor.nextdoor.domain.fintech.service.AccountService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/api/v1/fintechs")
public class PaymentController {

    private final AccountService accountService;

    public PaymentController(AccountService accountService) {
        this.accountService = accountService;
    }

    // 결제 API
    @PostMapping("/payments")
    public Mono<ResponseEntity<Map<String, Object>>> makePayment(
            @RequestBody PaymentRequestDto req) {

        return accountService.paymentAccount(
                        req.getUserKey(),
                        req.getDepositAccountNo(),
                        req.getTransactionBalance(),
                        req.getWithdrawalAccountNo(),
                        req.getDepositTransactionSummary(),
                        req.getWithdrawalTransactionSummary(),
                        req.getRentalId()
                )
                .map(ResponseEntity::ok)
                .doOnError(e -> log.error("결제 처리 오류", e))
                .onErrorResume(SsafyApiException.class, ex ->
                        Mono.just(ResponseEntity
                                .status(ex.getStatus())
                                .body(ex.getErrorBody())
                        )
                );
    }
}

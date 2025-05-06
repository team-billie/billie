package com.nextdoor.nextdoor.domain.fintech.client;

import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Component
public class SsafyApiClient {
    // Webflux에 WebClient를 활용하여 SSAFY API 호출
    private final WebClient webClient = WebClient.builder()
            .baseUrl("https://finopenapi.ssafy.io/ssafy/api/v1")
            .defaultHeader("Content-Type", "application/json")
            .build();

    // ssafy api 공통 Header 필드 추가하는 build
    private Map<String,Object> buildHeader(String apiName, String apiKey, String userKey) {
        String date = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyyMMdd"));
        String time = LocalTime.now().plusMinutes(5)
                .format(DateTimeFormatter.ofPattern("HHmmss"));
        Map<String,Object> header = new HashMap<>();
        header.put("apiName", apiName);
        header.put("transmissionDate", date);
        header.put("transmissionTime", time);
        header.put("institutionCode", "00100");
        header.put("fintechAppNo", "001");
        header.put("apiServiceCode", apiName);
        header.put("institutionTransactionUniqueNo",
                UUID.randomUUID().toString().replaceAll("-", "").substring(0,20));
        header.put("apiKey", apiKey);
        header.put("userKey", userKey);
        return header;
    }

    //계좌 생성
    public Mono<Map> createAccount(String apiKey, String userKey, String accountTypeUniqueNo) {
        Map<String,Object> body = new HashMap<>();
        body.put("Header", buildHeader("createDemandDepositAccount", apiKey, userKey));
        body.put("accountTypeUniqueNo", accountTypeUniqueNo);
        return webClient.post()
                .uri("/edu/demandDeposit/createDemandDepositAccount")
                .bodyValue(body)
                .retrieve()
                .bodyToMono(Map.class);
    }
}
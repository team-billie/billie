package com.nextdoor.nextdoor.domain.fintech.client;

import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;
import org.springframework.beans.factory.annotation.Value;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ThreadLocalRandom;

@Component
public class SsafyApiClient {
    // Webflux에 WebClient를 활용하여 SSAFY API 호출
    private final WebClient webClient;
    private final String apiKey;

    public SsafyApiClient(@Value("${custom.fintech.apiKey}") String apiKey) {
        this.apiKey = apiKey;
        this.webClient = WebClient.builder()
                .baseUrl("https://finopenapi.ssafy.io/ssafy/api/v1")
                .defaultHeader("Content-Type", "application/json")
                .build();
    }

    // ssafy api 공통 Header 필드 추가하는 build
    private Map<String,Object> buildHeader(String apiName, String apiKey, String userKey) {
        // 1) 오늘 날짜(YYYYMMDD)
        String date = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyyMMdd"));
        // 2) 지금 시각 +5분(HHMMSS)
        String time = LocalTime.now().plusMinutes(5)
                .format(DateTimeFormatter.ofPattern("HHmmss"));
        // 3) 뒤에 붙일 6자리 숫자 난수
        String random6 = String.format("%06d",
                ThreadLocalRandom.current().nextInt(0, 1_000_000));
        // 최종 20자리 숫자
        String txnUniqueNo = date + time + random6;

        Map<String,Object> header = new HashMap<>();
        header.put("apiName", apiName);
        header.put("transmissionDate", date);
        header.put("transmissionTime", time);
        header.put("institutionCode", "00100");
        header.put("fintechAppNo", "001");
        header.put("apiServiceCode", apiName);
        header.put("institutionTransactionUniqueNo", txnUniqueNo);
        header.put("apiKey", apiKey);
        header.put("userKey", userKey);
        return header;
    }

    //계정 생성
    public Mono<Map<String, Object>> createUser(String userId) {
        Map<String,Object> body = Map.of(
                "apiKey", apiKey,
                "userId", userId
        );

        return webClient.post()
                .uri("/member")
                .bodyValue(body)
                .exchangeToMono(resp -> {
                    if (resp.statusCode().is2xxSuccessful()) {
                        // 성공 시 {"userId":..., "userName":..., "institutionCode":...,"userKey":...,"created":...,"modified":...}
                        return resp.bodyToMono(new ParameterizedTypeReference<Map<String,Object>>() {});
                    } else {
                        return resp.bodyToMono(String.class)
                                .flatMap(raw -> Mono.error(
                                        new RuntimeException("SSAFY 회원가입 실패 [" +
                                                resp.statusCode() + "] : " + raw)
                                ));
                    }
                });
    }

    //계좌 생성
    public Mono<Map<String, Object>> createAccount(String userKey, String accountTypeUniqueNo) {
        Map<String,Object> body = new HashMap<>();
        body.put("Header", buildHeader("createDemandDepositAccount", apiKey, userKey));
        body.put("accountTypeUniqueNo", accountTypeUniqueNo);

        return webClient.post()
                .uri("/edu/demandDeposit/createDemandDepositAccount")
                .bodyValue(body)
                .exchangeToMono(resp -> {
                    if (resp.statusCode().is2xxSuccessful()) {
                        // 성공 시 Map 으로 파싱
                        return resp.bodyToMono(new ParameterizedTypeReference<Map<String,Object>>() {});
                    } else {
                        // SSAFY가 준 오류 JSON 전체(Map) 을 파싱해서 커스텀 익셉션으로 던짐
                        return resp.bodyToMono(new ParameterizedTypeReference<Map<String,Object>>() {})
                                .flatMap(err -> Mono.error(new SsafyApiException((HttpStatus) resp.statusCode(), err)));
                    }
                });
    }

    //계좌 입금(충전하기)
    public Mono<Map> deposit(String apiKey, String userKey, String accountNumber, int amount) {
        Map<String,Object> payload = new HashMap<>();
        payload.put("accountNumber", accountNumber);
        payload.put("amount", amount);

        Map<String,Object> body = new HashMap<>();
        body.put("Header", buildHeader("updateDemandDepositAccountDeposit", apiKey, userKey));
        body.putAll(payload);

        return webClient.post()
                .uri("/edu/demandDeposit/updateDemandDepositAccountDeposit")
                .bodyValue(body)
                .retrieve()
                .bodyToMono(Map.class);
    }

    //계좌 이체
    public Mono<Map> transfer(String apiKey, String userKey, String fromAccount, String toAccount, int amount) {
        Map<String,Object> payload = new HashMap<>();
        payload.put("fromAccountNumber", fromAccount);
        payload.put("toAccountNumber", toAccount);
        payload.put("amount", amount);

        Map<String,Object> body = new HashMap<>();
        body.put("Header", buildHeader("updateDemandDepositAccountTransfer", apiKey, userKey));
        body.putAll(payload);

        return webClient.post()
                .uri("/edu/demandDeposit/updateDemandDepositAccountTransfer")
                .bodyValue(body)
                .retrieve()
                .bodyToMono(Map.class);
    }

    //계좌 출금(보증금을 대여에 묶어두기 위해)
    public Mono<Map> withdraw(String apiKey, String userKey, String accountNumber, int amount) {
        Map<String,Object> payload = new HashMap<>();
        payload.put("accountNumber", accountNumber);
        payload.put("amount", amount);

        Map<String,Object> body = new HashMap<>();
        body.put("Header", buildHeader("updateDemandDepositAccountWithdrawal", apiKey, userKey));
        body.putAll(payload);

        return webClient.post()
                .uri("/edu/demandDeposit/updateDemandDepositAccountWithdrawal")
                .bodyValue(body)
                .retrieve()
                .bodyToMono(Map.class);
    }
}
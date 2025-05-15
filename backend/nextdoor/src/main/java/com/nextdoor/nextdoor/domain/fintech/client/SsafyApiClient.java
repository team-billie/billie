package com.nextdoor.nextdoor.domain.fintech.client;

import com.nextdoor.nextdoor.domain.fintech.dto.InquireTransactionHistoryRequestDto;
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
    public Mono<Map<String, Object>> createUser(Long userId, String ssafyApiEmail) {
        Map<String,Object> body = Map.of(
                "apiKey", apiKey,
                "userId", ssafyApiEmail
        );

        return webClient.post()
                .uri("/member")
                .bodyValue(body)
                .exchangeToMono(resp -> {
                    if (resp.statusCode().is2xxSuccessful()) {
                        // 성공 시 {"userId":..., "userName":..., "institutionCode":...,"userKey":...,"created":...,"modified":...}
                        return resp.bodyToMono(new ParameterizedTypeReference<Map<String,Object>>() {});
                    } else {
                        // SSAFY가 준 오류 JSON 전체(Map) 을 파싱해서 커스텀 익셉션으로 던짐
                        return resp.bodyToMono(new ParameterizedTypeReference<Map<String,Object>>() {})
                                .flatMap(err -> Mono.error(new SsafyApiException((HttpStatus) resp.statusCode(), err)));
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

    //계좌 목록 조회
    public Mono<Map<String,Object>> inquireAccountList(String userKey) {
        Map<String,Object> body = new HashMap<>();
        body.put("Header", buildHeader(
                "inquireDemandDepositAccountList",
                apiKey,
                userKey
        ));

        return webClient.post()
                .uri("/edu/demandDeposit/inquireDemandDepositAccountList")
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
    public Mono<Map<String,Object>> depositAccount(
            String userKey,
            String accountNo,
            long transactionBalance,
            String transactionSummary
    ) {
        Map<String,Object> body = new HashMap<>();
        // 공통 Header
        body.put("Header", buildHeader("updateDemandDepositAccountDeposit", apiKey, userKey));
        // 필수 파라미터
        body.put("accountNo", accountNo);
        body.put("transactionBalance", transactionBalance);
        // 선택 파라미터
        if (transactionSummary != null) {
            body.put("transactionSummary", transactionSummary);
        }

        return webClient.post()
                .uri("/edu/demandDeposit/updateDemandDepositAccountDeposit")
                .bodyValue(body)
                .exchangeToMono(resp -> {
                    if (resp.statusCode().is2xxSuccessful()) {
                        // SSAFY가 내려준 JSON 그대로 Map 으로 파싱
                        return resp.bodyToMono(new ParameterizedTypeReference<Map<String,Object>>() {});
                    } else {
                        // 오류일 땐 SSAFY error JSON(Map)으로 파싱 후 커스텀 익셉션
                        return resp.bodyToMono(new ParameterizedTypeReference<Map<String,Object>>() {})
                                .flatMap(err -> Mono.error(new SsafyApiException((HttpStatus) resp.statusCode(), err)));
                    }
                });
    }

    //계좌 이체
    public Mono<Map<String,Object>> transferAccount(
            String userKey,
            String depositAccountNo,
            long transactionBalance,
            String withdrawalAccountNo,
            String depositTransactionSummary,
            String withdrawalTransactionSummary
    ) {
        Map<String,Object> body = new HashMap<>();
        body.put("Header", buildHeader(
                "updateDemandDepositAccountTransfer",
                apiKey,
                userKey
        ));
        body.put("depositAccountNo", depositAccountNo);
        body.put("transactionBalance", transactionBalance);
        body.put("withdrawalAccountNo", withdrawalAccountNo);
        if (depositTransactionSummary != null) {
            body.put("depositTransactionSummary", depositTransactionSummary);
        }
        if (withdrawalTransactionSummary != null) {
            body.put("withdrawalTransactionSummary", withdrawalTransactionSummary);
        }

        return webClient.post()
                .uri("/edu/demandDeposit/updateDemandDepositAccountTransfer")
                .bodyValue(body)
                .exchangeToMono(resp -> {
                    if (resp.statusCode().is2xxSuccessful()) {
                        // SSAFY가 내려준 JSON 그대로 Map 으로 파싱
                        return resp.bodyToMono(new ParameterizedTypeReference<Map<String,Object>>() {});
                    } else {
                        // 오류일 땐 SSAFY error JSON(Map)으로 파싱 후 커스텀 익셉션
                        return resp.bodyToMono(new ParameterizedTypeReference<Map<String,Object>>() {})
                                .flatMap(err -> Mono.error(new SsafyApiException((HttpStatus) resp.statusCode(), err)));
                    }
                });
    }

    //계좌 출금(보증금을 대여에 묶어두기 위해)
    public Mono<Map<String,Object>> withdrawAccount(
            String userKey,
            String accountNo,
            long transactionBalance,
            String transactionSummary
    ) {
        Map<String,Object> body = new HashMap<>();
        body.put("Header", buildHeader(
                "updateDemandDepositAccountWithdrawal",
                apiKey,
                userKey
        ));
        body.put("accountNo", accountNo);
        body.put("transactionBalance", transactionBalance);
        if (transactionSummary != null) {
            body.put("transactionSummary", transactionSummary);
        }

        return webClient.post()
                .uri("/edu/demandDeposit/updateDemandDepositAccountWithdrawal")
                .bodyValue(body)
                .exchangeToMono(resp -> {
                    if (resp.statusCode().is2xxSuccessful()) {
                        // SSAFY가 내려준 JSON 그대로 Map 으로 파싱
                        return resp.bodyToMono(new ParameterizedTypeReference<Map<String,Object>>() {});
                    } else {
                        // 오류일 땐 SSAFY error JSON(Map)으로 파싱 후 커스텀 익셉션
                        return resp.bodyToMono(new ParameterizedTypeReference<Map<String,Object>>() {})
                                .flatMap(err -> Mono.error(new SsafyApiException((HttpStatus) resp.statusCode(), err)));
                    }
                });
    }

    // 계좌 거래 내역 조회
    public Mono<Map<String,Object>> inquireTransactionHistoryList(
            InquireTransactionHistoryRequestDto req
    ) {
        Map<String,Object> body = new HashMap<>();
        // 1) 공통 헤더
        body.put("Header", buildHeader(
                "inquireTransactionHistoryList",
                apiKey,
                req.getUserKey()
        ));
        // 2) 페이로드
        body.put("accountNo",        req.getAccountNo());
        body.put("startDate",        req.getStartDate());
        body.put("endDate",          req.getEndDate());
        body.put("transactionType",  req.getTransactionType());
        if (req.getOrderByType() != null) {
            body.put("orderByType", req.getOrderByType());
        }

        return webClient.post()
                .uri("/edu/demandDeposit/inquireTransactionHistoryList")
                .bodyValue(body)
                .exchangeToMono(resp -> {
                    if (resp.statusCode().is2xxSuccessful()) {
                        return resp.bodyToMono(
                                new ParameterizedTypeReference<Map<String,Object>>() {}
                        );
                    } else {
                        return resp.bodyToMono(
                                        new ParameterizedTypeReference<Map<String,Object>>() {}
                                )
                                .flatMap(err -> Mono.error(
                                        new SsafyApiException((HttpStatus)resp.statusCode(), err)
                                ));
                    }
                });
    }
}
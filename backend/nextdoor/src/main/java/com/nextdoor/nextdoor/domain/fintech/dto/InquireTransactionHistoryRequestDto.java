package com.nextdoor.nextdoor.domain.fintech.dto;

import lombok.*;
import jakarta.validation.constraints.NotBlank;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InquireTransactionHistoryRequestDto {
    /** SSAFY 헤더 생성용 유저 키 */
    @NotBlank
    private String userKey;
    /** 조회할 계좌번호 */
    @NotBlank
    private String accountNo;
    /** 조회 시작일 (YYYYMMDD) */
    @NotBlank
    private String startDate;
    /** 조회 종료일 (YYYYMMDD) */
    @NotBlank
    private String endDate;
    /** 거래구분 (M:입금, D:출금, A:전체) */
    @NotBlank
    private String transactionType;
    /** 정렬순서 (ASC, DESC) — 선택값 */
    private String orderByType;
}
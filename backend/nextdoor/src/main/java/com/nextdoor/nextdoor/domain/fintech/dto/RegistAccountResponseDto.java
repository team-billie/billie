package com.nextdoor.nextdoor.domain.fintech.dto;

import com.nextdoor.nextdoor.domain.fintech.domain.RegistAccountType;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
//등록된 계좌 목록 조회 Dto
public class RegistAccountResponseDto {
    private Long id;
    private String accountNo;
    private String bankCode;
    private RegistAccountType accountType;
    private String alias;
    private Boolean isPrimary;
    private Integer balance;
    private LocalDateTime registeredAt;
}

package com.nextdoor.nextdoor.domain.rental.service.dto;

import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RequestRemittanceResult {

    private String ownerNickname;
    private BigDecimal finalAmount;
    private BigDecimal deposit;
    private String accountNo;
    private String bankCode;
}

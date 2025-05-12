package com.nextdoor.nextdoor.domain.rental.controller.dto.response;

import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RemittanceResponse {

    private String ownerNickname;
    private BigDecimal rentalFee;
    private BigDecimal deposit;
    private String accountNo;
    private String bankCode;
}

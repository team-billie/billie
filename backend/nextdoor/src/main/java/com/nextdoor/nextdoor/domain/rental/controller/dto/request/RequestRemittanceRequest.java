package com.nextdoor.nextdoor.domain.rental.controller.dto.request;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class RequestRemittanceRequest {

    @NotNull(message = "대여자 ID는 필수입니다.")
    private Long renterId;

    @NotNull(message = "송금 금액은 필수입니다.")
    @DecimalMin(value = "0.0", inclusive = false, message = "송금 금액은 0보다 커야 합니다.")
    private BigDecimal remittanceAmount;
}

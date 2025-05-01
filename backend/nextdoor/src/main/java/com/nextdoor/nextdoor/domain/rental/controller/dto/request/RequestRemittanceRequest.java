package com.nextdoor.nextdoor.domain.rental.controller.dto.request;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class RequestRemittanceRequest {

    private Long renterId;
    private BigDecimal remittanceAmount;
}

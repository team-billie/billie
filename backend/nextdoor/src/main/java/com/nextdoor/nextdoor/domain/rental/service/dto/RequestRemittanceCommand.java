package com.nextdoor.nextdoor.domain.rental.service.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@AllArgsConstructor
public class RequestRemittanceCommand {

    private Long rentalId;
    private Long renterId;
    private BigDecimal remittanceAmount;
}

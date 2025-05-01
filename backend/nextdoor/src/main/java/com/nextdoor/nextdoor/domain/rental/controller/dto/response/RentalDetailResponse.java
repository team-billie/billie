package com.nextdoor.nextdoor.domain.rental.controller.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@Builder
public class RentalDetailResponse {

    private Long reservationId;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private BigDecimal rentalFee;
    private BigDecimal deposit;
    private String reservationStatus;
    private Long ownerId;
    private Long renterId;
    private Long rentalId;
    private String rentalStatus;
}

package com.nextdoor.nextdoor.domain.rental.controller.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@Builder
public class RentalDetailResponse {

    private Long reservationId;
    private LocalDate startDate;
    private LocalDate endDate;
    private BigDecimal rentalFee; //Per Day
    private BigDecimal deposit;
    private String reservationStatus;
    private Long ownerId;
    private Long renterId;
    private Long rentalId;
    private String rentalProcess;
    private String rentalStatus;
    private String title;
    private String productImageUrl;
}

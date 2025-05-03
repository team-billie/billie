package com.nextdoor.nextdoor.domain.reservation.controller.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;

import java.time.LocalDate;

@Getter
public class ReservationUpdateRequestDto {

    @NotNull
    private LocalDate startDate;

    @NotNull
    private LocalDate endDate;

    @NotNull
    private Long rentalFee;

    @NotNull
    private Long deposit;
}

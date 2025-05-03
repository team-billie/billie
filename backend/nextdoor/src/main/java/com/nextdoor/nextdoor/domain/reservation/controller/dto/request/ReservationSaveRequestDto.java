package com.nextdoor.nextdoor.domain.reservation.controller.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;

import java.time.LocalDate;

@Getter
public class ReservationSaveRequestDto {

    @NotNull
    private Long feedId;

    @NotNull
    private LocalDate startDate;

    @NotNull
    private LocalDate endDate;
}

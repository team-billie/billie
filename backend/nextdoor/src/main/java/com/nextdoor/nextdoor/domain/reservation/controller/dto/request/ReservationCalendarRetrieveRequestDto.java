package com.nextdoor.nextdoor.domain.reservation.controller.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;

@Getter
public class ReservationCalendarRetrieveRequestDto {

    @NotNull
    private Long postId;

    @NotNull
    private Integer year;

    @NotNull
    private Integer month;
}

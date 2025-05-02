package com.nextdoor.nextdoor.domain.reservation.controller.dto.request;

import com.nextdoor.nextdoor.domain.reservation.domain.Reservation;
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

    public Reservation toEntity() {
        return Reservation.builder()
                .
                .build()
    }
}

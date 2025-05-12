package com.nextdoor.nextdoor.domain.reservation.event;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;

@Builder
@AllArgsConstructor
@Getter
public class ReservationConfirmedEvent {

    private Long reservationId;
    private LocalDate endDate;
}

package com.nextdoor.nextdoor.domain.reservation.event;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDate;
import java.util.Date;

@AllArgsConstructor
@Getter
public class ReservationConfirmedEvent {

    private Long reservationId;
    private LocalDate endDate;
}

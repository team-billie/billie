package com.nextdoor.nextdoor.domain.reservation.event.out;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class ReservationConfirmedEvent {

    private Long ReservationId;
}

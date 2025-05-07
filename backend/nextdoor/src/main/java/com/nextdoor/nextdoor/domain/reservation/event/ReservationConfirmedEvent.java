package com.nextdoor.nextdoor.domain.reservation.event;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class ReservationConfirmedEvent {

    private Long ReservationId;
}

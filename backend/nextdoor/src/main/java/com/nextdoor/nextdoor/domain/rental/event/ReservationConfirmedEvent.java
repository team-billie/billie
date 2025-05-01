package com.nextdoor.nextdoor.domain.rental.event;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReservationConfirmedEvent {
    private Long reservationId;
}

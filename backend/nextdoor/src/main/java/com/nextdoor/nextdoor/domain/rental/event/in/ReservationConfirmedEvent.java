package com.nextdoor.nextdoor.domain.rental.event.in;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class ReservationConfirmedEvent {

    private Long reservationId;
    private Date endDate;
}

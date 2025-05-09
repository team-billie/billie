package com.nextdoor.nextdoor.domain.rental.event.in;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ReservationConfirmedEvent {

    private Long reservationId;
    private Date endDate;
}

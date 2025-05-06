package com.nextdoor.nextdoor.domain.rental.event.in;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DepositCompletedEvent {

    private Long rentalId;
}

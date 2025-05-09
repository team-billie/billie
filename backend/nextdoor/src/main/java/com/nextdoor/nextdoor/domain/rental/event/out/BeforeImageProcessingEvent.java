package com.nextdoor.nextdoor.domain.rental.event.out;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class BeforeImageProcessingEvent {

    private Long rentalId;
}
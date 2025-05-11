package com.nextdoor.nextdoor.domain.rental.listener;

import com.nextdoor.nextdoor.domain.rental.event.in.ReservationConfirmedEvent;
import com.nextdoor.nextdoor.domain.rental.service.RentalService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ReservationConfirmedEventListener {

    private final RentalService rentalService;

    @Async("asyncExecutor")
    @EventListener
    public void handleReservationConfirmedEvent(ReservationConfirmedEvent reservationConfirmedEvent) {
        rentalService.createFromReservation(reservationConfirmedEvent);
    }
}

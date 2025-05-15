package com.nextdoor.nextdoor.domain.rental.listener;

import com.nextdoor.nextdoor.domain.rental.service.RentalService;
import com.nextdoor.nextdoor.domain.reservation.event.ReservationConfirmedEvent;
import lombok.RequiredArgsConstructor;
import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;
import org.springframework.transaction.event.TransactionPhase;
import org.springframework.transaction.event.TransactionalEventListener;

@Component
@RequiredArgsConstructor
public class ReservationConfirmedEventListener {

    private final RentalService rentalService;

    @Async("asyncExecutor")
    @TransactionalEventListener(phase = TransactionPhase.BEFORE_COMMIT)
    public void handleReservationConfirmedEvent(ReservationConfirmedEvent reservationConfirmedEvent) {
        rentalService.createFromReservation(reservationConfirmedEvent);
    }
}

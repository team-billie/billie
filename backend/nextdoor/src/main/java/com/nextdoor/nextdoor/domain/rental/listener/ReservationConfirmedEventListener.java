package com.nextdoor.nextdoor.domain.rental.listener;

import com.nextdoor.nextdoor.domain.rental.event.ReservationConfirmedEvent;
import com.nextdoor.nextdoor.domain.rental.service.RentalService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;
import org.springframework.transaction.event.TransactionPhase;
import org.springframework.transaction.event.TransactionalEventListener;

@Component
@RequiredArgsConstructor
public class ReservationConfirmedEventListener {

    private final RentalService rentalService;

    @Async("asyncExecutor")
    @TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)
    @Transactional
    public void handleReservationConfirmedEvent(ReservationConfirmedEvent reservationConfirmedEvent) {
        rentalService.createFromReservation(reservationConfirmedEvent);
    }
}

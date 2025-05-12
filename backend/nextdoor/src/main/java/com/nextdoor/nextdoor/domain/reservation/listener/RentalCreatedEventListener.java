package com.nextdoor.nextdoor.domain.reservation.listener;

import com.nextdoor.nextdoor.domain.rental.event.out.RentalCreatedEvent;
import com.nextdoor.nextdoor.domain.reservation.domain.Reservation;
import com.nextdoor.nextdoor.domain.reservation.exception.NoSuchReservationException;
import com.nextdoor.nextdoor.domain.reservation.repository.ReservationRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;
import org.springframework.transaction.event.TransactionPhase;
import org.springframework.transaction.event.TransactionalEventListener;

@Component
@RequiredArgsConstructor
public class RentalCreatedEventListener {

    private final ReservationRepository reservationRepository;

    @Async("asyncExecutor")
    @TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)
    @Transactional
    public void handleRentalCreatedEvent(RentalCreatedEvent rentalCreatedEvent) {
        Reservation reservation = reservationRepository.findById(rentalCreatedEvent.getReservationId())
                .orElseThrow(NoSuchReservationException::new);
        
        reservation.updateRentalId(rentalCreatedEvent.getRentalId());
    }
}
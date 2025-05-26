package com.nextdoor.nextdoor.domain.reservation.listener;

import com.nextdoor.nextdoor.domain.rentalreservation.event.out.RentalCreatedEvent;
import com.nextdoor.nextdoor.domain.reservation.domain.Reservation;
import com.nextdoor.nextdoor.domain.reservation.enums.ReservationStatus;
import com.nextdoor.nextdoor.domain.reservation.exception.NoSuchReservationException;
import com.nextdoor.nextdoor.domain.reservation.repository.ReservationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.event.TransactionPhase;
import org.springframework.transaction.event.TransactionalEventListener;

@Component
@RequiredArgsConstructor
public class RentalCreatedEventListener {

    private final ReservationRepository reservationRepository;

    @TransactionalEventListener(phase = TransactionPhase.BEFORE_COMMIT)
    public void handleRentalCreatedEvent(RentalCreatedEvent rentalCreatedEvent) {
        Reservation reservation = reservationRepository.findById(rentalCreatedEvent.getReservationId())
                .orElseThrow(NoSuchReservationException::new);
        reservation.updateStatus(ReservationStatus.CONFIRMED);
        reservation.updateRentalId(rentalCreatedEvent.getRentalId());
    }
}
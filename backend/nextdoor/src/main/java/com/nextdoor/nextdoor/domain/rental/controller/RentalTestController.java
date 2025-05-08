package com.nextdoor.nextdoor.domain.rental.controller;

import com.nextdoor.nextdoor.domain.rental.event.in.DepositCompletedEvent;
import com.nextdoor.nextdoor.domain.rental.event.in.RemittanceCompletedEvent;
import com.nextdoor.nextdoor.domain.rental.event.in.ReservationConfirmedEvent;
import com.nextdoor.nextdoor.domain.rental.service.RentalEndService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.time.LocalDateTime;

/**
 * This controller is for testing purposes only.
 * It simulates events that would normally come from other domains.
 */
@RestController
@RequestMapping("/api/v1/test/rentals")
@RequiredArgsConstructor
public class RentalTestController {

    private final ApplicationEventPublisher eventPublisher;
    private final RentalEndService rentalEndService;

    /**
     * Simulates a reservation confirmation event, which creates a new rental.
     * @param reservationId The ID of the reservation
     * @param daysUntilEnd Number of days until the rental ends
     * @return 200 OK if successful
     */
    @PostMapping("/reservation-confirmed")
    public ResponseEntity<Void> simulateReservationConfirmed(
            @RequestParam Long reservationId,
            @RequestParam(defaultValue = "7") Integer daysUntilEnd) {
        
        ReservationConfirmedEvent event = ReservationConfirmedEvent.builder()
                .reservationId(reservationId)
                .endDate(Date.valueOf(LocalDateTime.now().plusDays(daysUntilEnd).toLocalDate()))
                .build();
        
        eventPublisher.publishEvent(event);
        
        return ResponseEntity.ok().build();
    }

    /**SSSS
     * Simulates a remittance completed event, which updates the rental status.
     * @param rentalId The ID of the rental
     * @return 200 OK if successful
     */
    @PostMapping("/{rentalId}/remittance-completed")
    public ResponseEntity<Void> simulateRemittanceCompleted(@PathVariable Long rentalId) {
        RemittanceCompletedEvent event = RemittanceCompletedEvent.builder()
                .rentalId(rentalId)
                .build();
        
        eventPublisher.publishEvent(event);
        
        return ResponseEntity.ok().build();
    }

    /**
     * Simulates a deposit completed event, which updates the rental status.
     * @param rentalId The ID of the rental
     * @return 200 OK if successful
     */
    @PostMapping("/{rentalId}/deposit-completed")
    public ResponseEntity<Void> simulateDepositCompleted(@PathVariable Long rentalId) {
        DepositCompletedEvent event = DepositCompletedEvent.builder()
                .rentalId(rentalId)
                .build();
        
        eventPublisher.publishEvent(event);
        
        return ResponseEntity.ok().build();
    }

    /**
     * Simulates the end of a rental period, which updates the rental status.
     * @param rentalId The ID of the rental
     * @return 200 OK if successful
     */
    @PostMapping("/{rentalId}/rental-end")
    public ResponseEntity<Void> simulateRentalEnd(@PathVariable Long rentalId) {
        rentalEndService.rentalEnd(rentalId);
        
        return ResponseEntity.ok().build();
    }
}
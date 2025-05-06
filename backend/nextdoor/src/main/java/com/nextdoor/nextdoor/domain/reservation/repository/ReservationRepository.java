package com.nextdoor.nextdoor.domain.reservation.repository;

import com.nextdoor.nextdoor.domain.reservation.domain.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {
}

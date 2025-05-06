package com.nextdoor.nextdoor.domain.rental.repository;

import com.nextdoor.nextdoor.domain.rental.domain.Rental;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RentalRepository extends JpaRepository<Rental, Long>, RentalCustomRepository {

    Optional<Rental> findByRentalId(Long rentalId);
    Optional<Rental> findByReservationId(Long reservationId);
    List<Rental> findByReservationIdIn(List<Long> reservationIds);
}

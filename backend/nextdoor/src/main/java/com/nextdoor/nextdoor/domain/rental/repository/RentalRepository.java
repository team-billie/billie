package com.nextdoor.nextdoor.domain.rental.repository;

import com.nextdoor.nextdoor.domain.rental.domain.Rental;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RentalRepository extends JpaRepository<Rental, Long> {
}

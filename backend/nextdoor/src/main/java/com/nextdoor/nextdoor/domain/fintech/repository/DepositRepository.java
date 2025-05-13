package com.nextdoor.nextdoor.domain.fintech.repository;

import com.nextdoor.nextdoor.domain.fintech.domain.Deposit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface DepositRepository extends JpaRepository<Deposit, Long> {

    @Query("SELECT DISTINCT d FROM Deposit d "
            + "JOIN FETCH d.registAccount ra "
            + "JOIN FETCH ra.account a "
            + "WHERE d.rentalId = :rentalId")
    Optional<Deposit> findByRentalId(@Param("rentalId") Long rentalId);
}
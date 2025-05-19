package com.nextdoor.nextdoor.domain.fintech.repository;

import com.nextdoor.nextdoor.domain.fintech.domain.Deposit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface DepositRepository extends JpaRepository<Deposit, Long> {
    /**
     * rentalId 로 Deposit 을 조회할 때, 연관된 Account(및 Member)를 함께 패치
     */
    @Query("""
        SELECT d
        FROM Deposit d
        JOIN FETCH d.account a
        JOIN FETCH a.member m
        WHERE d.rentalId = :rentalId
        """)
    Optional<Deposit> findByRentalId(@Param("rentalId") Long rentalId);
}
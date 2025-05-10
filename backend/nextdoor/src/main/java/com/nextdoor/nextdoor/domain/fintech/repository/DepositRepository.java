package com.nextdoor.nextdoor.domain.fintech.repository;
import com.nextdoor.nextdoor.domain.fintech.domain.Deposit;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface DepositRepository extends JpaRepository<Deposit, Long> {
    @Query("SELECT d FROM Deposit d "
            + " JOIN FETCH d.registAccount ra"
            + " JOIN FETCH ra.account a"
            + " WHERE d.id = :id")
    Optional<Deposit> findWithAccount(@Param("id") Long id);
}
package com.nextdoor.nextdoor.domain.fintech.repository;
import com.nextdoor.nextdoor.domain.fintech.domain.Deposit;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DepositRepository extends JpaRepository<Deposit, Long> {
    List<Deposit> findByRentalId(Long rentalId);
}
package com.nextdoor.nextdoor.domain.rental.repository;

import com.nextdoor.nextdoor.domain.rental.service.dto.AiComparisonResult;

import java.util.Optional;

public interface RentalCustomRepository {

    Optional<AiComparisonResult> findRentalWithImagesByRentalId(Long rentalId);
}

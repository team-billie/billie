package com.nextdoor.nextdoor.domain.rental.repository;

import com.nextdoor.nextdoor.domain.rental.service.dto.AiAnalysisResult;

import java.util.Optional;

public interface RentalCustomRepository {

    Optional<AiAnalysisResult> findRentalWithImagesByRentalId(Long rentalId);
}

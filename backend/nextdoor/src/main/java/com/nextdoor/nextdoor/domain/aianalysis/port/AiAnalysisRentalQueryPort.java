package com.nextdoor.nextdoor.domain.aianalysis.port;

import com.nextdoor.nextdoor.domain.aianalysis.service.dto.RentalDto;

import java.util.Optional;

public interface AiAnalysisRentalQueryPort {

    Optional<RentalDto> findById(Long id);
}

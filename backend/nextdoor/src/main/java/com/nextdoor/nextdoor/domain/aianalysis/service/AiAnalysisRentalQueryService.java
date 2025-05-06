package com.nextdoor.nextdoor.domain.aianalysis.service;

import com.nextdoor.nextdoor.domain.aianalysis.service.dto.RentalDto;

public interface AiAnalysisRentalQueryService {

    RentalDto findById(Long id);
}

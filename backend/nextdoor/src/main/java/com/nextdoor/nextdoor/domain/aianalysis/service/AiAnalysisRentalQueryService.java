package com.nextdoor.nextdoor.domain.aianalysis.service;

import com.nextdoor.nextdoor.domain.aianalysis.service.dto.AiImageDto;

import java.util.List;

public interface AiAnalysisRentalQueryService {

    List<AiImageDto> findByRentalId(Long id);
}

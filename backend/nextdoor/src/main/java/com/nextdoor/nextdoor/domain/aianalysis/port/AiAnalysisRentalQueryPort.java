package com.nextdoor.nextdoor.domain.aianalysis.port;

import com.nextdoor.nextdoor.domain.aianalysis.service.dto.RentalDto;

public interface AiAnalysisRentalQueryPort {

    RentalDto findById(Long id);
}

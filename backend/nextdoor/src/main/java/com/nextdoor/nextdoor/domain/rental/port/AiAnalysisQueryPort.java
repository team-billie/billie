package com.nextdoor.nextdoor.domain.rental.port;

import com.nextdoor.nextdoor.domain.rental.service.dto.AiAnalysisResult;
import org.springframework.stereotype.Repository;

@Repository
public interface AiAnalysisQueryPort {
    AiAnalysisResult getAiAnalysisResult(Long rentalId);
}

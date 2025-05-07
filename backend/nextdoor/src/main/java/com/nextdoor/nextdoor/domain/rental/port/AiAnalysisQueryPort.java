package com.nextdoor.nextdoor.domain.rental.port;

import com.nextdoor.nextdoor.common.OutboundPort;
import com.nextdoor.nextdoor.domain.rental.service.dto.AiAnalysisResult;

@OutboundPort
public interface AiAnalysisQueryPort {
    AiAnalysisResult getAiAnalysisResult(Long rentalId);
}

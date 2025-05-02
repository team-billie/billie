package com.nextdoor.nextdoor.domain.aianalysis.service;

import com.nextdoor.nextdoor.domain.aianalysis.controller.dto.request.InspectDamageRequestDto;
import com.nextdoor.nextdoor.domain.aianalysis.controller.dto.response.InspectDamageResponseDto;

public interface AiAnalysisService {

    InspectDamageResponseDto inspectDamage(InspectDamageRequestDto inspectDamageRequestDto);
}

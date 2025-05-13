package com.nextdoor.nextdoor.domain.aianalysis.service;

import com.nextdoor.nextdoor.domain.aianalysis.controller.dto.request.DamageAnalysisRequestDto;
import com.nextdoor.nextdoor.domain.aianalysis.controller.dto.request.DamageComparisonRequestDto;
import com.nextdoor.nextdoor.domain.aianalysis.controller.dto.response.InspectDamageResponseDto;

public interface AiAnalysisService {

    InspectDamageResponseDto analyzeDamage(Long loginUserId, DamageAnalysisRequestDto damageAnalysisRequestDto);

    InspectDamageResponseDto compareDamage(Long loginUserId, DamageComparisonRequestDto damageComparisonRequestDto);
}

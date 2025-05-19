package com.nextdoor.nextdoor.domain.aianalysis.service;

import com.nextdoor.nextdoor.domain.aianalysis.controller.dto.request.DamageAnalysisRequestDto;
import com.nextdoor.nextdoor.domain.aianalysis.controller.dto.request.DamageComparisonRequestDto;
import com.nextdoor.nextdoor.domain.aianalysis.controller.dto.response.DamageAnalysisResponseDto;
import com.nextdoor.nextdoor.domain.aianalysis.controller.dto.response.DamageComparisonResponseDto;

public interface AiAnalysisService {

    DamageAnalysisResponseDto analyzeDamage(Long loginUserId, DamageAnalysisRequestDto damageAnalysisRequestDto);

    DamageComparisonResponseDto compareDamage(Long loginUserId, DamageComparisonRequestDto damageComparisonRequestDto);
}

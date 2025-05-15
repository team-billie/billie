package com.nextdoor.nextdoor.domain.aianalysis.controller;

import com.nextdoor.nextdoor.domain.aianalysis.controller.dto.request.DamageAnalysisRequestDto;
import com.nextdoor.nextdoor.domain.aianalysis.controller.dto.request.DamageComparisonRequestDto;
import com.nextdoor.nextdoor.domain.aianalysis.controller.dto.response.InspectDamageResponseDto;
import com.nextdoor.nextdoor.domain.aianalysis.service.AiAnalysisService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/ai")
public class AiAnalysisController {

    private final AiAnalysisService aiAnalysisService;

    @PostMapping("/analyze")
    public ResponseEntity<InspectDamageResponseDto> analyzeDamage(
            @AuthenticationPrincipal Long loginUserId,
            @RequestBody DamageAnalysisRequestDto damageAnalysisRequestDto
    ) {
        return ResponseEntity.ok(aiAnalysisService.analyzeDamage(loginUserId, damageAnalysisRequestDto));
    }

    @PostMapping("/compare")
    public ResponseEntity<InspectDamageResponseDto> compareDamage(
            @AuthenticationPrincipal Long loginUserId,
            @RequestBody DamageComparisonRequestDto damageComparisonRequestDto
    ) {
        return ResponseEntity.ok(aiAnalysisService.compareDamage(loginUserId, damageComparisonRequestDto));
    }
}

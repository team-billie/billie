package com.nextdoor.nextdoor.domain.aianalysis.controller;

import com.nextdoor.nextdoor.domain.aianalysis.controller.dto.request.InspectDamageRequestDto;
import com.nextdoor.nextdoor.domain.aianalysis.controller.dto.response.InspectDamageResponseDto;
import com.nextdoor.nextdoor.domain.aianalysis.service.AiAnalysisService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/ai-analysis")
public class AiAnalysisController {

    private final AiAnalysisService aiAnalysisService;

    @PostMapping
    public ResponseEntity<InspectDamageResponseDto> inspectDamage(@RequestBody InspectDamageRequestDto inspectDamageRequestDto) {
        return ResponseEntity.ok(aiAnalysisService.inspectDamage(inspectDamageRequestDto));
    }
}

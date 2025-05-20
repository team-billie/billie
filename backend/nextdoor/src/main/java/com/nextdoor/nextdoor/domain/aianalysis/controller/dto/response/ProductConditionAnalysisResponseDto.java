package com.nextdoor.nextdoor.domain.aianalysis.controller.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
public class ProductConditionAnalysisResponseDto {
    private String condition;
    private String report;
    private boolean suggestAutoFill;
    private String autoFillMessage;
}

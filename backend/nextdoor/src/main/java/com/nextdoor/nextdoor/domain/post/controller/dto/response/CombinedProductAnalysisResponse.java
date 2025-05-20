package com.nextdoor.nextdoor.domain.post.controller.dto.response;

import com.nextdoor.nextdoor.domain.aianalysis.controller.dto.response.ProductConditionAnalysisResponseDto;
import com.nextdoor.nextdoor.domain.post.domain.Category;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CombinedProductAnalysisResponse {

    private String title;
    private String content;
    private Category category;
    private String condition;
    private String report;
    private String autoFillMessage;

    public static CombinedProductAnalysisResponse from(
            AnalyzeProductImageResponse imageResponse,
            ProductConditionAnalysisResponseDto conditionResponse) {

        return CombinedProductAnalysisResponse.builder()
                .title(imageResponse.getTitle())
                .content(imageResponse.getContent())
                .category(imageResponse.getCategory())
                .condition(conditionResponse.getCondition()) 
                .report(conditionResponse.getReport())
                .autoFillMessage(conditionResponse.getAutoFillMessage())
                .build();
    }
}

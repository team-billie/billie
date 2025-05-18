package com.nextdoor.nextdoor.domain.aianalysis.controller.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@AllArgsConstructor
@Getter
public class DamageComparisonResponseDto {

    private List<String> beforeImages;
    private List<String> afterImages;
    private String overallComparisonResult;
    private List<MatchingResult> matchingResults;

    @AllArgsConstructor
    @Getter
    public static class MatchingResult {

        private String beforeImage;
        private String afterImage;
        private String pairComparisonResult;
    }
}

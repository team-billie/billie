package com.nextdoor.nextdoor.domain.aianalysis.event.out;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@AllArgsConstructor
@Getter
public class AiCompareAnalysisCompletedEvent {

    private Long rentalId;
    private String overallComparisonResult;
    private List<MatchingResult> matchingResults;

    @AllArgsConstructor
    @Getter
    public static class MatchingResult {

        private Long beforeImageId;
        private Long afterImageId;
        private String pairComparisonResult;
    }
}

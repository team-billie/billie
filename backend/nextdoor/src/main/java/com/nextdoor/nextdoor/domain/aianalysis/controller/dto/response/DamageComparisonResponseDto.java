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
        private PairComparisonResult pairComparisonResult;

        @AllArgsConstructor
        @Getter
        public static class PairComparisonResult {

            private String result;
            private List<Damage> damages;

            @AllArgsConstructor
            @Getter
            public static class Damage {

                private String damageType;
                private String location;
                private String details;
                private float confidenceScore;

                @AllArgsConstructor
                @Getter
                public static class BoundingBox {

                    private float xMin;
                    private float yMin;
                    private float xMax;
                    private float yMax;
                }
            }
        }
    }
}

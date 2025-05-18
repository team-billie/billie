package com.nextdoor.nextdoor.domain.aianalysis.service.dto;

import lombok.Getter;

import java.util.List;

@Getter
public class ImageMatcherResponseDto {

    private Integer beforeCount;
    private Integer afterCount;
    private List<Match> matches;

    @Getter
    private static class Match {

        private Integer beforeIndex;
        private Integer afterIndex;
        private Double similarity;
    }
}

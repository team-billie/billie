package com.nextdoor.nextdoor.domain.aianalysis.service.dto;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Getter;
import lombok.ToString;

import java.util.List;

@Getter
@ToString
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class ImageMatcherResponseDto {

    private Integer beforeCount;
    private Integer afterCount;
    private List<Match> matches;

    @Getter
    @ToString
    @JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
    private static class Match {

        private Integer beforeIndex;
        private Integer afterIndex;
        private Double similarity;
    }
}

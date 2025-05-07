package com.nextdoor.nextdoor.domain.rental.controller.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Builder
public class AiAnalysisResponse {

    private List<String> beforeImages;
    private List<String> afterImages;
    private String analysis;
}

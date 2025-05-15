package com.nextdoor.nextdoor.domain.aianalysis.controller.dto.request;

import com.nextdoor.nextdoor.domain.aianalysis.enums.AiImageType;
import lombok.Getter;

@Getter
public class DamageAnalysisRequestDto {

    private Long rentalId;
    private AiImageType aiImageType;
}

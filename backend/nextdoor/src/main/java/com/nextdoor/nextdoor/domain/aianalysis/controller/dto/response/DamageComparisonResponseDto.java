package com.nextdoor.nextdoor.domain.aianalysis.controller.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@AllArgsConstructor
@Getter
public class DamageComparisonResponseDto {

    private List<String> damageComparisonResults;
}

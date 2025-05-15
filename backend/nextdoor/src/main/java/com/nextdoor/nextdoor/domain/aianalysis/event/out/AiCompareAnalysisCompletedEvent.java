package com.nextdoor.nextdoor.domain.aianalysis.event.out;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class AiCompareAnalysisCompletedEvent {

    private Long rentalId;
    private String damageAnalysis;
}

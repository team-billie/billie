package com.nextdoor.nextdoor.domain.rental.listener;

import com.nextdoor.nextdoor.domain.aianalysis.event.out.AiAnalysisCompletedEvent;
import com.nextdoor.nextdoor.domain.rental.service.RentalService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AiAnalysisCompletedEventListener {

    private final RentalService rentalService;

    @Async("asyncExecutor")
    @EventListener
    public void handleAiAnalysisCompletedEvent(AiAnalysisCompletedEvent aiAnalysisCompletedEvent) {
        rentalService.updateDamageAnalysis(
                aiAnalysisCompletedEvent.getRentalId(),
                aiAnalysisCompletedEvent.getDamageAnalysis()
        );
    }
}
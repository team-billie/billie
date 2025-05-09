package com.nextdoor.nextdoor.domain.rental.listener;

import com.nextdoor.nextdoor.domain.aianalysis.event.out.AiAnalysisCompletedEvent;
import com.nextdoor.nextdoor.domain.rental.service.RentalService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;
import org.springframework.transaction.event.TransactionPhase;
import org.springframework.transaction.event.TransactionalEventListener;

@Component
@RequiredArgsConstructor
public class AiAnalysisCompletedEventListener {

    private final RentalService rentalService;

    @Async("asyncExecutor")
    @TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)
    @Transactional
    public void handleAiAnalysisCompletedEvent(AiAnalysisCompletedEvent aiAnalysisCompletedEvent) {
        rentalService.updateDamageAnalysis(
                aiAnalysisCompletedEvent.getRentalId(),
                aiAnalysisCompletedEvent.getDamageAnalysis()
        );
    }
}
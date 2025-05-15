package com.nextdoor.nextdoor.domain.rental.listener;

import com.nextdoor.nextdoor.domain.aianalysis.event.out.AiAnalysisCompletedEvent;
import com.nextdoor.nextdoor.domain.rental.domain.RentalProcess;
import com.nextdoor.nextdoor.domain.rental.domain.RentalStatus;
import com.nextdoor.nextdoor.domain.rental.message.RentalStatusMessage;
import com.nextdoor.nextdoor.domain.rental.service.RentalService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;
import org.springframework.transaction.event.TransactionPhase;
import org.springframework.transaction.event.TransactionalEventListener;

@Component
@RequiredArgsConstructor
public class AiAnalysisCompletedEventListener {

    private final RentalService rentalService;
    private final SimpMessagingTemplate messagingTemplate;

    @Async("asyncExecutor")
    @TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)
    public void handleAiAnalysisCompletedEvent(AiAnalysisCompletedEvent aiAnalysisCompletedEvent) {
        rentalService.updateDamageAnalysis(
                aiAnalysisCompletedEvent.getRentalId(),
                aiAnalysisCompletedEvent.getDamageAnalysis()
        );

        messagingTemplate.convertAndSend(
                "/topic/rental/" + aiAnalysisCompletedEvent.getRentalId() + "/status",
                RentalStatusMessage.builder()
                        .process(RentalProcess.BEFORE_RENTAL.name())
                        .detailStatus(RentalStatus.BEFORE_PHOTO_ANALYZED.name())
                        .build()
        );
    }
}
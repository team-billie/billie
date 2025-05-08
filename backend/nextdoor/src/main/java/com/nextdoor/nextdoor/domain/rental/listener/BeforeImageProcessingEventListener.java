package com.nextdoor.nextdoor.domain.rental.listener;

import com.nextdoor.nextdoor.domain.rental.domain.RentalProcess;
import com.nextdoor.nextdoor.domain.rental.domain.RentalStatus;
import com.nextdoor.nextdoor.domain.rental.event.out.BeforeImageProcessingEvent;
import com.nextdoor.nextdoor.domain.rental.message.RentalStatusMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;
import org.springframework.transaction.event.TransactionPhase;
import org.springframework.transaction.event.TransactionalEventListener;

@Component
@RequiredArgsConstructor
public class BeforeImageProcessingEventListener {

    private final SimpMessagingTemplate messagingTemplate;

    @Async("asyncExecutor")
    @TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)
    public void handleBeforeImageProcessingEvent(BeforeImageProcessingEvent event) {
        messagingTemplate.convertAndSend(
                "/topic/rental/" + event.getRentalId() + "/status",
                RentalStatusMessage.builder()
                        .process(RentalProcess.BEFORE_RENTAL.name())
                        .detailStatus(RentalStatus.BEFORE_PHOTO_REGISTERED.name())
                        .build()
        );
    }
}
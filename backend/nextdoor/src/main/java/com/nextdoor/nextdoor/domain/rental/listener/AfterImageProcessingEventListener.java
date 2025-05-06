package com.nextdoor.nextdoor.domain.rental.listener;

import com.nextdoor.nextdoor.domain.rental.domain.RentalProcess;
import com.nextdoor.nextdoor.domain.rental.domain.RentalStatus;
import com.nextdoor.nextdoor.domain.rental.event.out.DepositProcessingRequestEvent;
import com.nextdoor.nextdoor.domain.rental.event.out.RentalCompletedEvent;
import com.nextdoor.nextdoor.domain.rental.message.RentalStatusMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;
import org.springframework.transaction.event.TransactionPhase;
import org.springframework.transaction.event.TransactionalEventListener;


@Component
@RequiredArgsConstructor
public class AfterImageProcessingEventListener {

    private final SimpMessagingTemplate messagingTemplate;

    @Async("asyncExecutor")
    @TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)
    public void handleRentalCompletedEvent(RentalCompletedEvent event) {
        messagingTemplate.convertAndSend(
                "/topic/rental/" + event.getRentalId() + "/status",
                RentalStatusMessage.builder()
                        .process(RentalProcess.RENTAL_COMPLETED.name())
                        .detailStatus(RentalStatus.RENTAL_COMPLETED.name())
                        .build()
        );
    }

    @Async("asyncExecutor")
    @TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)
    public void handleDepositProcessingRequestEvent(DepositProcessingRequestEvent event) {
        messagingTemplate.convertAndSend(
                "/topic/rental/" + event.getRentalId() + "/status",
                RentalStatusMessage.builder()
                        .process(RentalProcess.RETURNED.name())
                        .detailStatus(RentalStatus.DEPOSIT_REQUESTED.name())
                        .build()
        );
    }
}
package com.nextdoor.nextdoor.domain.rental.listener;

import com.nextdoor.nextdoor.domain.rental.domain.RentalProcess;
import com.nextdoor.nextdoor.domain.rental.domain.RentalStatus;
import com.nextdoor.nextdoor.domain.rental.event.in.RemittanceCompletedEvent;
import com.nextdoor.nextdoor.domain.rental.message.RentalStatusMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;
import org.springframework.transaction.event.TransactionPhase;
import org.springframework.transaction.event.TransactionalEventListener;

@Component
@RequiredArgsConstructor
public class RemittanceCompletedEventListener {

    private final SimpMessagingTemplate messagingTemplate;

    @Async("asyncExecutor")
    @TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)
    public void handleRemittanceCompletedEvent(RemittanceCompletedEvent remittanceCompletedEvent){
        messagingTemplate.convertAndSend("/topic/rental/" + remittanceCompletedEvent.getRentalId() + "/status",
                RentalStatusMessage.builder()
                        .process(RentalProcess.RENTAL_IN_ACTIVE.name())
                        .detailStatus(RentalStatus.REMITTANCE_CONFIRMED.name())
                        .build()
        );
    }
}

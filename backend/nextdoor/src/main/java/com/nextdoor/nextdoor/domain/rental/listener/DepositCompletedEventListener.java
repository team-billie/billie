
package com.nextdoor.nextdoor.domain.rental.listener;

import com.nextdoor.nextdoor.domain.fintech.event.DepositCompletedEvent;
import com.nextdoor.nextdoor.domain.rental.domain.RentalProcess;
import com.nextdoor.nextdoor.domain.rental.domain.RentalStatus;
import com.nextdoor.nextdoor.domain.rental.message.RentalStatusMessage;
import com.nextdoor.nextdoor.domain.rental.service.RentalService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;
import org.springframework.transaction.event.TransactionPhase;
import org.springframework.transaction.event.TransactionalEventListener;

@Component
@RequiredArgsConstructor
public class DepositCompletedEventListener {

    private final RentalService rentalService;
    private final SimpMessagingTemplate messagingTemplate;

    @Async("asyncExecutor")
    @TransactionalEventListener(phase = TransactionPhase.BEFORE_COMMIT)
    public void handleDepositCompletedEvent(DepositCompletedEvent event) {
        rentalService.completeDepositProcessing(event);

        messagingTemplate.convertAndSend(
                "/topic/rental/" + event.getRentalId() + "/status",
                RentalStatusMessage.builder()
                        .process(RentalProcess.RENTAL_COMPLETED.name())
                        .detailStatus(RentalStatus.RENTAL_COMPLETED.name())
                        .build()
        );
    }
}

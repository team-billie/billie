package com.nextdoor.nextdoor.domain.rental.service;

import com.nextdoor.nextdoor.domain.rental.domain.RentalProcess;
import com.nextdoor.nextdoor.domain.rental.domain.RentalStatus;
import com.nextdoor.nextdoor.domain.rental.message.RentalStatusMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RentalEndService {

    private final RentalService rentalService;
    private final SimpMessagingTemplate messagingTemplate;

    public void rentalEnd(Long rentalId) {
        rentalService.completeRentalEndProcessing(rentalId);

        messagingTemplate.convertAndSend("/topic/rental/" + rentalId + "/status"
            , RentalStatusMessage.builder()
                    .process(RentalProcess.RETURNED.name())
                    .detailStatus(RentalStatus.RENTAL_PERIOD_ENDED.name())
                    .build()
        );
    }
}

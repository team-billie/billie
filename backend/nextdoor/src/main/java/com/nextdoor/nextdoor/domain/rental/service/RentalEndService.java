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
        System.out.println("[DEBUG_LOG] RentalEndService.rentalEnd called for rental ID: " + rentalId);
        try {
            rentalService.completeRentalEndProcessing(rentalId);
            System.out.println("[DEBUG_LOG] completeRentalEndProcessing completed successfully for rental ID: " + rentalId);
        } catch (Exception e) {
            System.out.println("[DEBUG_LOG] Error in completeRentalEndProcessing: " + e.getMessage());
            e.printStackTrace();
        }
    }
}

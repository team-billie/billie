package com.nextdoor.nextdoor.domain.rentalreservation.service;

import com.nextdoor.nextdoor.domain.rentalreservation.domain.RentalReservationProcess;
import com.nextdoor.nextdoor.domain.rentalreservation.domain.RentalReservationStatus;
import com.nextdoor.nextdoor.domain.rentalreservation.message.RentalStatusMessage;
import com.nextdoor.nextdoor.domain.rentalreservation.repository.RentalRepository;
import com.nextdoor.nextdoor.domain.rentalreservation.domain.Rental;
import com.nextdoor.nextdoor.domain.rentalreservation.exception.NoSuchRentalException;
import com.nextdoor.nextdoor.domain.rentalreservation.port.RentalDetailQueryPort;
import com.nextdoor.nextdoor.domain.rentalreservation.port.MemberUuidQueryPort;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class RentalEndService {

    private final RentalRepository rentalRepository;
    private final SimpMessagingTemplate messagingTemplate;
    private final MemberUuidQueryPort memberUuidQueryPort;
    private final RentalDetailQueryPort rentalDetailQueryPort;

    @Transactional
    public void rentalEnd(Long rentalId) {
        System.out.println("[DEBUG_LOG] RentalEndService.rentalEnd called for rental ID: " + rentalId);
        try {
            Rental rental = rentalRepository.findByRentalId(rentalId)
                    .orElseThrow(() -> new NoSuchRentalException("대여 정보가 존재하지 않습니다."));

            rental.processRentalPeriodEnd();

            String renterUuid = memberUuidQueryPort.getMemberUuidByRentalIdAndRole(
                    rental.getRentalId(),
                    "RENTER"
            );

            RentalStatusMessage.RentalDetailResult rentalDetailResult = rentalDetailQueryPort.getRentalDetailByRentalIdAndRole(
                    rental.getRentalId()
            );

            messagingTemplate.convertAndSend("/topic/rental/" + renterUuid + "/status"
                    , RentalStatusMessage.builder()
                            .rentalId(rental.getRentalId())
                            .process(RentalReservationProcess.RETURNED.name())
                            .detailStatus(RentalReservationStatus.RENTAL_PERIOD_ENDED.name())
                            .rentalDetail(rentalDetailResult)
                            .build()
            );

            messagingTemplate.convertAndSend(
                    "/topic/rental/" + rental.getRentalId() + "/status",
                    RentalStatusMessage.builder()
                            .process(RentalReservationProcess.RETURNED.name())
                            .detailStatus(RentalReservationStatus.RENTAL_PERIOD_ENDED.name())
                            .rentalDetail(rentalDetailResult)
                            .build()
            );

            System.out.println("[DEBUG_LOG] completeRentalEndProcessing completed successfully for rental ID: " + rentalId);
        } catch (Exception e) {
            System.out.println("[DEBUG_LOG] Error in completeRentalEndProcessing: " + e.getMessage());
            e.printStackTrace();
        }
    }
}

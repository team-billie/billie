package com.nextdoor.nextdoor.domain.rental.service;

import com.nextdoor.nextdoor.domain.rental.event.in.DepositCompletedEvent;
import com.nextdoor.nextdoor.domain.rental.event.in.RemittanceCompletedEvent;
import com.nextdoor.nextdoor.domain.reservation.event.ReservationConfirmedEvent;
import com.nextdoor.nextdoor.domain.rental.service.dto.*;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

@Service
public interface RentalService {

    void createFromReservation(ReservationConfirmedEvent reservationConfirmedEvent);
    UploadImageResult registerBeforePhoto(UploadImageCommand command);
    RequestRemittanceResult requestRemittance(RequestRemittanceCommand command);
    void completeRemittanceProcessing(RemittanceCompletedEvent remittanceCompletedEvent);
    void completeRentalEndProcessing(Long rentalId);
    UploadImageResult registerAfterPhoto(UploadImageCommand command);
    Page<SearchRentalResult> searchRentals(SearchRentalCommand command);
    void completeDepositProcessing(DepositCompletedEvent depositCompletedEvent);
    AiAnalysisResult getAiAnalysis(Long rentalId);
    void updateDamageAnalysis(Long rentalId, String damageAnalysis);
    UpdateAccountResult updateAccount(UpdateAccountCommand command);
}

package com.nextdoor.nextdoor.domain.rental.service;

import com.nextdoor.nextdoor.domain.fintech.event.DepositCompletedEvent;
import com.nextdoor.nextdoor.domain.fintech.event.RemittanceCompletedEvent;
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
    void updateRentalDepositId(Long rentalId, Long depositId);
    AiAnalysisResult getAiAnalysis(Long rentalId);
    void updateDamageAnalysis(Long rentalId, String damageAnalysis);
    void updateComparedAnalysis(Long rentalId, String comparedAnalysis);
    UpdateAccountResult updateAccount(UpdateAccountCommand command);
    ManagedRentalCountResult countManagedRentals(Long ownerId);
    SearchRentalResult getRentalById(Long rentalId);
}

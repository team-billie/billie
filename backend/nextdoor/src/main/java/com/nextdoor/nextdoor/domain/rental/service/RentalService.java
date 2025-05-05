package com.nextdoor.nextdoor.domain.rental.service;

import com.nextdoor.nextdoor.domain.rental.event.in.DepositCompletedEvent;
import com.nextdoor.nextdoor.domain.rental.event.in.ReservationConfirmedEvent;
import com.nextdoor.nextdoor.domain.rental.service.dto.*;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

@Service
public interface RentalService {

    void createFromReservation(ReservationConfirmedEvent reservationConfirmedEvent);
    UploadImageResult registerBeforePhoto(UploadImageCommand command);
    void requestRemittance(RequestRemittanceCommand command);
    UploadImageResult registerAfterPhoto(UploadImageCommand command);
    Page<SearchRentalResult> searchRentals(SearchRentalCommand command);
    void completeDepositProcessing(DepositCompletedEvent depositCompletedEvent);
}

package com.nextdoor.nextdoor.domain.rental.service;

import com.nextdoor.nextdoor.domain.rental.event.in.ReservationConfirmedEvent;
import com.nextdoor.nextdoor.domain.rental.service.dto.*;
import org.springframework.stereotype.Service;

@Service
public interface RentalService {

    void createFromReservation(ReservationConfirmedEvent reservationConfirmedEvent);
    public UploadImageResult registerBeforePhoto(UploadImageCommand command);
    void requestRemittance(RequestRemittanceCommand command);
    public UploadImageResult registerAfterPhoto(UploadImageCommand command);
}

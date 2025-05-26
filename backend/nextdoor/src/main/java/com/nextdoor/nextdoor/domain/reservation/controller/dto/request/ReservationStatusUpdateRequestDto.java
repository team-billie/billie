package com.nextdoor.nextdoor.domain.reservation.controller.dto.request;

import com.nextdoor.nextdoor.domain.rentalreservation.domain.RentalReservationStatus;
import com.nextdoor.nextdoor.domain.reservation.enums.ReservationStatus;
import lombok.Getter;

@Getter
public class ReservationStatusUpdateRequestDto {

    private RentalReservationStatus status;
}

package com.nextdoor.nextdoor.domain.reservation.service;

import com.nextdoor.nextdoor.domain.reservation.controller.dto.request.ReservationSaveRequestDto;
import com.nextdoor.nextdoor.domain.reservation.controller.dto.response.ReservationResponseDto;

public interface ReservationService {

    ReservationResponseDto createReservation(ReservationSaveRequestDto reservationSaveRequestDto);
}

package com.nextdoor.nextdoor.domain.reservation.service;

import com.nextdoor.nextdoor.domain.reservation.controller.dto.request.ReservationSaveRequestDto;
import com.nextdoor.nextdoor.domain.reservation.controller.dto.request.ReservationStatusUpdateRequestDto;
import com.nextdoor.nextdoor.domain.reservation.controller.dto.request.ReservationUpdateRequestDto;
import com.nextdoor.nextdoor.domain.reservation.controller.dto.response.ReservationResponseDto;

public interface ReservationService {

    ReservationResponseDto createReservation(Long loginUserId, ReservationSaveRequestDto reservationSaveRequestDto);

    ReservationResponseDto updateReservation(Long loginUserId, Long reservationId, ReservationUpdateRequestDto reservationUpdateRequestDto);

    ReservationResponseDto updateReservationStatus(Long loginUserId, Long reservationId, ReservationStatusUpdateRequestDto reservationStatusUpdateRequestDto);

    void deleteReservation(Long loginUserId, Long reservationId);
}

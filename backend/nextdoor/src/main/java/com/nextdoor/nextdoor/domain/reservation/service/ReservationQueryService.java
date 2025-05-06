package com.nextdoor.nextdoor.domain.reservation.service;

import com.nextdoor.nextdoor.domain.reservation.controller.dto.request.ReservationRetrieveRequestDto;
import com.nextdoor.nextdoor.domain.reservation.controller.dto.response.ReservationResponseDto;

import java.util.List;

public interface ReservationQueryService {

    List<ReservationResponseDto> retrieveSentReservations(Long loginUserId, ReservationRetrieveRequestDto requestDto);

    List<ReservationResponseDto> retrieveReceivedReservations(Long loginUserId, ReservationRetrieveRequestDto reservationRetrieveRequestDto);
}

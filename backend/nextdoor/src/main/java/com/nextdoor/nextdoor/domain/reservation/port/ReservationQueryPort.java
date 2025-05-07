package com.nextdoor.nextdoor.domain.reservation.port;

import com.nextdoor.nextdoor.domain.reservation.controller.dto.request.ReservationRetrieveRequestDto;
import com.nextdoor.nextdoor.domain.reservation.service.dto.ReservationQueryDto;

import java.util.List;

public interface ReservationQueryPort {

    List<ReservationQueryDto> findSentReservations(Long loginUserId, ReservationRetrieveRequestDto requestDto);

    List<ReservationQueryDto> findReceivedReservations(Long loginUserId, ReservationRetrieveRequestDto requestDto);
}

package com.nextdoor.nextdoor.query.repository;

import com.nextdoor.nextdoor.domain.reservation.controller.dto.request.ReservationRetrieveRequestDto;
import com.nextdoor.nextdoor.query.dto.ReservationQueryDto;

import java.util.List;

public interface ReservationQueryPort {

    List<ReservationQueryDto> findSentReservations(Long loginUserId, ReservationRetrieveRequestDto requestDto);
}

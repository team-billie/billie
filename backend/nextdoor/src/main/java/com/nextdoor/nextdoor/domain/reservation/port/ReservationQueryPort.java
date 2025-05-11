package com.nextdoor.nextdoor.domain.reservation.port;

import com.nextdoor.nextdoor.domain.reservation.controller.dto.request.ReservationCalendarRetrieveRequestDto;
import com.nextdoor.nextdoor.domain.reservation.controller.dto.request.ReservationRetrieveRequestDto;
import com.nextdoor.nextdoor.domain.reservation.service.dto.ReservationCalendarQueryDto;
import com.nextdoor.nextdoor.domain.reservation.service.dto.ReservationQueryDto;

import java.util.List;
import java.util.Optional;

public interface ReservationQueryPort {

    Optional<ReservationQueryDto> findById(Long reservationId);

    List<ReservationQueryDto> findSentReservations(Long loginUserId, ReservationRetrieveRequestDto requestDto);

    List<ReservationQueryDto> findReceivedReservations(Long loginUserId, ReservationRetrieveRequestDto requestDto);

    List<ReservationCalendarQueryDto> findReservationCalendar(ReservationCalendarRetrieveRequestDto requestDto);
}

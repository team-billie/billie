package com.nextdoor.nextdoor.domain.reservation.service;

import com.nextdoor.nextdoor.domain.reservation.controller.dto.request.ReservationCalendarRetrieveRequestDto;
import com.nextdoor.nextdoor.domain.reservation.controller.dto.request.ReservationRetrieveRequestDto;
import com.nextdoor.nextdoor.domain.reservation.controller.dto.response.ReservationCalendarResponseDto;
import com.nextdoor.nextdoor.domain.reservation.controller.dto.response.ReservationResponseDto;
import com.nextdoor.nextdoor.domain.reservation.port.ReservationQueryPort;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ReservationQueryServiceImpl implements ReservationQueryService {

    private final ReservationQueryPort reservationQueryPort;

    @Override
    public List<ReservationResponseDto> retrieveSentReservations(Long loginUserId, ReservationRetrieveRequestDto requestDto) {
        return reservationQueryPort.findSentReservations(loginUserId, requestDto).stream()
                .map(ReservationResponseDto::from).toList();
    }

    @Override
    public List<ReservationResponseDto> retrieveReceivedReservations(Long loginUserId, ReservationRetrieveRequestDto requestDto) {
        return reservationQueryPort.findReceivedReservations(loginUserId, requestDto).stream()
                .map(ReservationResponseDto::from).toList();
    }

    @Override
    public ReservationCalendarResponseDto retrieveReservationCalendar(Long loginUserId, ReservationCalendarRetrieveRequestDto requestDto) {
        List<ReservationCalendarResponseDto.Period> periods = reservationQueryPort.findReservationCalendar(requestDto).stream()
                .map(reservation -> new ReservationCalendarResponseDto.Period(reservation.getStartDate(), reservation.getEndDate()))
                .toList();
        return new ReservationCalendarResponseDto(periods);
    }
}

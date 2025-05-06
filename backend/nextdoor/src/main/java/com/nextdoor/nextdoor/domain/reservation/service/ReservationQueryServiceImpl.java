package com.nextdoor.nextdoor.domain.reservation.service;

import com.nextdoor.nextdoor.domain.reservation.controller.dto.request.ReservationRetrieveRequestDto;
import com.nextdoor.nextdoor.domain.reservation.controller.dto.response.ReservationResponseDto;
import com.nextdoor.nextdoor.query.repository.ReservationQueryPort;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ReservationQueryServiceImpl implements ReservationQueryService {

    private final ReservationQueryPort reservationQueryPort;

    @Override
    public List<ReservationResponseDto> retrieveSentReservations(Long loginUserId, ReservationRetrieveRequestDto requestDto) {
        return reservationQueryPort.findSentReservations(loginUserId, null).stream()
                .map(ReservationResponseDto::from).toList();
    }

    @Override
    public List<ReservationResponseDto> retrieveReceivedReservations(Long loginUserId, ReservationRetrieveRequestDto reservationRetrieveRequestDto) {
        return List.of();
    }
}

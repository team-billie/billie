package com.nextdoor.nextdoor.domain.reservation.controller;

import com.nextdoor.nextdoor.domain.reservation.controller.dto.request.ReservationSaveRequestDto;
import com.nextdoor.nextdoor.domain.reservation.controller.dto.response.ReservationResponseDto;
import com.nextdoor.nextdoor.domain.reservation.service.ReservationService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;

@RequiredArgsConstructor
@Slf4j
@RestController
@RequestMapping("/api/v1/reservations")
public class ReservationController {

    private final ReservationService reservationService;

    @PostMapping
    public ResponseEntity<ReservationResponseDto> createReservation(
            HttpServletRequest request,
            @RequestBody ReservationSaveRequestDto reservationSaveRequestDto
    ) {
        ReservationResponseDto reservationResponseDto = reservationService.createReservation(reservationSaveRequestDto);
        return ResponseEntity.created(URI.create(request.getRequestURI())).body(reservationResponseDto);
    }
}

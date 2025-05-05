package com.nextdoor.nextdoor.domain.reservation.controller;

import com.nextdoor.nextdoor.domain.reservation.controller.dto.request.ReservationRetrieveRequestDto;
import com.nextdoor.nextdoor.domain.reservation.controller.dto.request.ReservationSaveRequestDto;
import com.nextdoor.nextdoor.domain.reservation.controller.dto.request.ReservationStatusUpdateRequestDto;
import com.nextdoor.nextdoor.domain.reservation.controller.dto.request.ReservationUpdateRequestDto;
import com.nextdoor.nextdoor.domain.reservation.controller.dto.response.ReservationResponseDto;
import com.nextdoor.nextdoor.domain.reservation.service.ReservationQueryService;
import com.nextdoor.nextdoor.domain.reservation.service.ReservationService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.coyote.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RequiredArgsConstructor
@Slf4j
@RestController
@RequestMapping("/api/v1/reservations")
public class ReservationController {

    private final ReservationService reservationService;
    private final ReservationQueryService reservationQueryService;

    @PostMapping
    public ResponseEntity<ReservationResponseDto> createReservation(
            HttpServletRequest request,
            @RequestBody ReservationSaveRequestDto reservationSaveRequestDto
    ) {
        Long loginUserId = 1L;
        ReservationResponseDto reservationResponseDto = reservationService.createReservation(loginUserId, reservationSaveRequestDto);
        return ResponseEntity.created(URI.create(request.getRequestURI())).body(reservationResponseDto);
    }

    @PutMapping("/{reservationId}")
    public ResponseEntity<ReservationResponseDto> updateReservation(
            HttpServletRequest request,
            @PathVariable Long reservationId,
            @RequestBody ReservationUpdateRequestDto reservationUpdateRequestDto
    ) {
        Long loginUserId = 1L;
        ReservationResponseDto reservationResponseDto = reservationService.updateReservation(loginUserId, reservationId, reservationUpdateRequestDto);
        return ResponseEntity.ok(reservationResponseDto);
    }

    @PatchMapping("/{reservationId}/status")
    public ResponseEntity<ReservationResponseDto> updateReservationStatus(
            @PathVariable Long reservationId,
            @RequestBody ReservationStatusUpdateRequestDto reservationStatusUpdateRequestDto
    ) {
        Long loginUserId = 1L;
        ReservationResponseDto reservationResponseDto = reservationService.updateReservationStatus(loginUserId, reservationId, reservationStatusUpdateRequestDto);
        return ResponseEntity.ok(reservationResponseDto);
    }

    @DeleteMapping("/{reservationId}")
    public ResponseEntity<ReservationResponseDto> deleteReservation(
            @PathVariable Long reservationId
    ) {
        Long loginUserId = 1L;
        reservationService.deleteReservation(loginUserId, reservationId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/sent")
    public ResponseEntity<List<ReservationResponseDto>> retrieveSentReservations(
            @ModelAttribute ReservationRetrieveRequestDto reservationRetrieveRequestDto
    ) {
        Long loginUserId = 1L;
        return ResponseEntity.ok(reservationQueryService.retrieveSentReservations(loginUserId, reservationRetrieveRequestDto));
    }
}

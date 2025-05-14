package com.nextdoor.nextdoor.domain.reservation.controller;

import com.nextdoor.nextdoor.domain.reservation.controller.dto.request.*;
import com.nextdoor.nextdoor.domain.reservation.controller.dto.response.ReservationCalendarResponseDto;
import com.nextdoor.nextdoor.domain.reservation.controller.dto.response.ReservationResponseDto;
import com.nextdoor.nextdoor.domain.reservation.service.ReservationQueryService;
import com.nextdoor.nextdoor.domain.reservation.service.ReservationService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RequiredArgsConstructor
@Slf4j
@RestController
@RequestMapping("/api/v1/reservations")
public class ReservationController {

    private final SimpMessagingTemplate simpMessagingTemplate;

    private final ReservationService reservationService;
    private final ReservationQueryService reservationQueryService;

    @PostMapping
    public ResponseEntity<ReservationResponseDto> createReservation(
            HttpServletRequest request,
            @AuthenticationPrincipal Long loginUserId,
            @RequestBody ReservationSaveRequestDto reservationSaveRequestDto
    ) {
        ReservationResponseDto reservationResponseDto = reservationService.createReservation(loginUserId, reservationSaveRequestDto);
        return ResponseEntity.created(URI.create(request.getRequestURI())).body(reservationResponseDto);
    }

    @PutMapping("/{reservationId}")
    public ResponseEntity<ReservationResponseDto> updateReservation(
            HttpServletRequest request,
            @AuthenticationPrincipal Long loginUserId,
            @PathVariable Long reservationId,
            @RequestBody ReservationUpdateRequestDto reservationUpdateRequestDto
    ) {
        ReservationResponseDto reservationResponseDto = reservationService.updateReservation(loginUserId, reservationId, reservationUpdateRequestDto);
        return ResponseEntity.ok(reservationResponseDto);
    }

    @PatchMapping("/{reservationId}/status")
    public ResponseEntity<ReservationResponseDto> updateReservationStatus(
            @AuthenticationPrincipal Long loginUserId,
            @PathVariable Long reservationId,
            @RequestBody ReservationStatusUpdateRequestDto reservationStatusUpdateRequestDto
    ) {
        ReservationResponseDto reservationResponseDto = reservationService.updateReservationStatus(loginUserId, reservationId, reservationStatusUpdateRequestDto);
        return ResponseEntity.ok(reservationResponseDto);
    }

    @DeleteMapping("/{reservationId}")
    public ResponseEntity<ReservationResponseDto> deleteReservation(
            @AuthenticationPrincipal Long loginUserId,
            @PathVariable Long reservationId
    ) {
        reservationService.deleteReservation(loginUserId, reservationId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/sent")
    public ResponseEntity<List<ReservationResponseDto>> retrieveSentReservations(
            @AuthenticationPrincipal Long loginUserId,
            @ModelAttribute ReservationRetrieveRequestDto reservationRetrieveRequestDto
    ) {
        return ResponseEntity.ok(reservationQueryService.retrieveSentReservations(loginUserId, reservationRetrieveRequestDto));
    }

    @GetMapping("/received")
    public ResponseEntity<List<ReservationResponseDto>> retrieveReceivedReservations(
            @AuthenticationPrincipal Long loginUserId,
            @ModelAttribute ReservationRetrieveRequestDto reservationRetrieveRequestDto
    ) {
        return ResponseEntity.ok(reservationQueryService.retrieveReceivedReservations(loginUserId, reservationRetrieveRequestDto));
    }

    @GetMapping("/calendar")
    public ResponseEntity<ReservationCalendarResponseDto> retrieveReservationCalendar(
            @AuthenticationPrincipal Long loginUserId,
            @ModelAttribute ReservationCalendarRetrieveRequestDto reservationCalendarRetrieveRequestDto
    ) {
        return ResponseEntity.ok(reservationQueryService.retrieveReservationCalendar(loginUserId, reservationCalendarRetrieveRequestDto));
    }
}

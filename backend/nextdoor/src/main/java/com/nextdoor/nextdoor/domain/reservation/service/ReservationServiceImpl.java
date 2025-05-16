package com.nextdoor.nextdoor.domain.reservation.service;

import com.nextdoor.nextdoor.domain.reservation.controller.dto.request.ReservationSaveRequestDto;
import com.nextdoor.nextdoor.domain.reservation.controller.dto.request.ReservationStatusUpdateRequestDto;
import com.nextdoor.nextdoor.domain.reservation.controller.dto.request.ReservationUpdateRequestDto;
import com.nextdoor.nextdoor.domain.reservation.controller.dto.response.ReservationResponseDto;
import com.nextdoor.nextdoor.domain.reservation.domain.Reservation;
import com.nextdoor.nextdoor.domain.reservation.enums.ReservationStatus;
import com.nextdoor.nextdoor.domain.reservation.event.ReservationConfirmedEvent;
import com.nextdoor.nextdoor.domain.reservation.exception.AlreadyConfirmedException;
import com.nextdoor.nextdoor.domain.reservation.exception.IllegalStatusException;
import com.nextdoor.nextdoor.domain.reservation.exception.NoSuchReservationException;
import com.nextdoor.nextdoor.domain.reservation.exception.UnauthorizedException;
import com.nextdoor.nextdoor.domain.reservation.port.ReservationPostQueryPort;
import com.nextdoor.nextdoor.domain.reservation.repository.ReservationRepository;
import com.nextdoor.nextdoor.domain.reservation.service.dto.PostDto;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
@Transactional
public class ReservationServiceImpl implements ReservationService {

    private final SimpMessagingTemplate simpMessagingTemplate;

    private final ApplicationEventPublisher applicationEventPublisher;

    private final ReservationPostQueryPort reservationPostQueryPort;
    private final ReservationRepository reservationRepository;

    @Override
    public ReservationResponseDto createReservation(Long loginUserId, ReservationSaveRequestDto reservationSaveRequestDto) {
        PostDto post = reservationPostQueryPort.findById(reservationSaveRequestDto.getPostId()).orElseThrow();
        Reservation reservation = reservationRepository.save(Reservation.builder()
                .startDate(reservationSaveRequestDto.getStartDate())
                .endDate(reservationSaveRequestDto.getEndDate())
                .rentalFee(post.getRentalFee())
                .deposit(post.getDeposit())
                .status(ReservationStatus.PENDING)
                .ownerId(post.getAuthorId())
                .renterId(loginUserId)
                .postId(post.getPostId())
                .build());
        ReservationResponseDto response = ReservationResponseDto.from(reservation, post);
        simpMessagingTemplate.convertAndSend("/topic/reservation/" + post.getAuthorUuid(), response);
        return response;
    }

    @Override
    public ReservationResponseDto updateReservation(Long loginUserId, Long reservationId, ReservationUpdateRequestDto reservationUpdateRequestDto) {
        Reservation reservation = reservationRepository.findById(reservationId).orElseThrow(NoSuchReservationException::new);
        validateOwner(loginUserId, reservation);
        reservation.updateStartDate(reservationUpdateRequestDto.getStartDate());
        reservation.updateEndDate(reservationUpdateRequestDto.getEndDate());
        reservation.updateRentalFee(reservationUpdateRequestDto.getRentalFee());
        reservation.updateDeposit(reservationUpdateRequestDto.getDeposit());
        return ReservationResponseDto.from(
                reservation,
                reservationPostQueryPort.findById(reservation.getPostId()).orElseThrow());
    }

    @Override
    public ReservationResponseDto updateReservationStatus(Long loginUserId, Long reservationId, ReservationStatusUpdateRequestDto reservationStatusUpdateRequestDto) {
        if (reservationStatusUpdateRequestDto.getStatus() != ReservationStatus.CONFIRMED) {
            throw new IllegalStatusException("잘못된 status입니다.");
        }
        Reservation reservation = reservationRepository.findById(reservationId).orElseThrow(NoSuchReservationException::new);
        validateOwner(loginUserId, reservation);
        validateNotConfirmed(reservation);
        reservation.updateStatus(reservationStatusUpdateRequestDto.getStatus());
        applicationEventPublisher.publishEvent(new ReservationConfirmedEvent(reservation.getId(), reservation.getEndDate()));
        return ReservationResponseDto.from(
                reservation,
                reservationPostQueryPort.findById(reservation.getPostId()).orElseThrow());
    }

    @Override
    public void deleteReservation(Long loginUserId, Long reservationId) {
        Reservation reservation = reservationRepository.findById(reservationId).orElseThrow(NoSuchReservationException::new);
        validateOwnerOrRenter(loginUserId, reservation);
        validateNotConfirmed(reservation);
        reservationRepository.delete(reservation);
    }

    private void validateNotConfirmed(Reservation reservation) {
        if (reservation.getStatus() == ReservationStatus.CONFIRMED) {
            throw new AlreadyConfirmedException("이미 확정된 예약입니다.");
        }
    }

    private void validateOwner(Long loginUserId, Reservation reservation) {
        if (!reservation.getOwnerId().equals(loginUserId)) {
            throw new UnauthorizedException("권한이 없습니다.");
        }
    }

    private void validateOwnerOrRenter(Long loginUserId, Reservation reservation) {
        if (!reservation.getOwnerId().equals(loginUserId) && !reservation.getRenterId().equals(loginUserId)) {
            throw new UnauthorizedException("권한이 없습니다.");
        }
    }
}

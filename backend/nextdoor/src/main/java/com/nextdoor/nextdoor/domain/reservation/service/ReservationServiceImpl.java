package com.nextdoor.nextdoor.domain.reservation.service;

import com.nextdoor.nextdoor.domain.reservation.controller.dto.request.ReservationSaveRequestDto;
import com.nextdoor.nextdoor.domain.reservation.controller.dto.request.ReservationStatusUpdateRequestDto;
import com.nextdoor.nextdoor.domain.reservation.controller.dto.request.ReservationUpdateRequestDto;
import com.nextdoor.nextdoor.domain.reservation.controller.dto.response.ReservationResponseDto;
import com.nextdoor.nextdoor.domain.reservation.domain.Reservation;
import com.nextdoor.nextdoor.domain.reservation.enums.ReservationStatus;
import com.nextdoor.nextdoor.domain.reservation.exception.IllegalStatusException;
import com.nextdoor.nextdoor.domain.reservation.exception.NoSuchReservationException;
import com.nextdoor.nextdoor.domain.reservation.repository.ReservationRepository;
import com.nextdoor.nextdoor.domain.reservation.service.dto.FeedDto;
import com.nextdoor.nextdoor.domain.reservation.service.dto.MemberDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
@Transactional
public class ReservationServiceImpl implements ReservationService {

    private final ReservationFeedQueryService reservationFeedQueryService;
    private final ReservationMemberQueryService reservationMemberQueryService;

    private final ReservationRepository reservationRepository;

    @Override
    public ReservationResponseDto createReservation(Long loginUserId, ReservationSaveRequestDto reservationSaveRequestDto) {
        FeedDto feed = reservationFeedQueryService.findById(reservationSaveRequestDto.getFeedId());
        MemberDto owner = reservationMemberQueryService.findById(loginUserId);
        Reservation reservation = reservationRepository.save(Reservation.builder()
                .startDate(reservationSaveRequestDto.getStartDate())
                .endDate(reservationSaveRequestDto.getEndDate())
                .rentalFee(feed.getRentalFee())
                .deposit(feed.getDeposit())
                .status(ReservationStatus.PENDING)
                .ownerId(feed.getAuthorId())
                .renterId(loginUserId)
                .feedId(feed.getFeedId())
                .build());
        return ReservationResponseDto.from(reservation, feed, owner);
    }

    @Override
    public ReservationResponseDto updateReservation(Long loginUserId, Long reservationId, ReservationUpdateRequestDto reservationUpdateRequestDto) {
        Reservation reservation = reservationRepository.findById(reservationId).orElseThrow(NoSuchReservationException::new);
        reservation.updateStartDate(reservationUpdateRequestDto.getStartDate());
        reservation.updateEndDate(reservationUpdateRequestDto.getEndDate());
        reservation.updateRentalFee(reservationUpdateRequestDto.getRentalFee());
        reservation.updateDeposit(reservationUpdateRequestDto.getDeposit());
        return ReservationResponseDto.from(
                reservation,
                reservationFeedQueryService.findById(reservation.getFeedId()),
                reservationMemberQueryService.findById(reservation.getOwnerId()));
    }

    @Override
    public ReservationResponseDto updateReservationStatus(Long loginUserId, Long reservationId, ReservationStatusUpdateRequestDto reservationStatusUpdateRequestDto) {
        if (reservationStatusUpdateRequestDto.getStatus() != ReservationStatus.CONFIRMED) {
            throw new IllegalStatusException("잘못된 status입니다.");
        }
        Reservation reservation = reservationRepository.findById(reservationId).orElseThrow(NoSuchReservationException::new);
        reservation.updateStatus(reservationStatusUpdateRequestDto.getStatus());
        return ReservationResponseDto.from(
                reservation,
                reservationFeedQueryService.findById(reservation.getFeedId()),
                reservationMemberQueryService.findById(reservation.getOwnerId()));
    }

    @Override
    public void deleteReservation(Long loginUserid, Long reservationId) {
        reservationRepository.deleteById(reservationId);
    }
}

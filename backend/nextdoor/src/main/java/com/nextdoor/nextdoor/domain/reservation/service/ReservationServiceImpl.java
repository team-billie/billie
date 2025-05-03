package com.nextdoor.nextdoor.domain.reservation.service;

import com.nextdoor.nextdoor.domain.reservation.controller.dto.request.ReservationSaveRequestDto;
import com.nextdoor.nextdoor.domain.reservation.controller.dto.response.ReservationResponseDto;
import com.nextdoor.nextdoor.domain.reservation.domain.Reservation;
import com.nextdoor.nextdoor.domain.reservation.enums.ReservationStatus;
import com.nextdoor.nextdoor.domain.reservation.repository.ReservationRepository;
import com.nextdoor.nextdoor.domain.reservation.service.dto.FeedDto;
import com.nextdoor.nextdoor.domain.reservation.service.dto.MemberDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
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
}

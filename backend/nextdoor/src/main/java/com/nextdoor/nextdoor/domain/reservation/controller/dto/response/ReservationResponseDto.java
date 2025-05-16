package com.nextdoor.nextdoor.domain.reservation.controller.dto.response;

import com.nextdoor.nextdoor.domain.reservation.domain.Reservation;
import com.nextdoor.nextdoor.domain.reservation.service.dto.PostDto;
import com.nextdoor.nextdoor.domain.reservation.service.dto.ReservationMemberQueryDto;
import com.nextdoor.nextdoor.domain.reservation.service.dto.ReservationQueryDto;
import lombok.Getter;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Getter
public class ReservationResponseDto {

    private Long reservationId;
    private String postTitle;
    private List<String> postProductImages;
    private LocalDate startDate;
    private LocalDate endDate;
    private BigDecimal rentalFee;
    private BigDecimal deposit;
    private String status;
    private String ownerName;
    private String ownerProfileImageUrl;
    private String renterName;
    private String renterProfileImageUrl;

    public static ReservationResponseDto from(Reservation reservation, PostDto post, ReservationMemberQueryDto renter) {
        ReservationResponseDto response = new ReservationResponseDto();
        response.reservationId = reservation.getId();
        response.postTitle = post.getTitle();
        response.postProductImages = post.getProductImages();
        response.startDate = reservation.getStartDate();
        response.endDate = reservation.getEndDate();
        response.rentalFee = reservation.getRentalFee();
        response.deposit = reservation.getDeposit();
        response.status = reservation.getStatus().name();
        response.ownerName = post.getAuthorName();
        response.ownerProfileImageUrl = post.getAuthorProfileImageUrl();
        response.renterName = renter.getNickname();
        response.renterProfileImageUrl = renter.getProfileImageUrl();
        return response;
    }

    public static ReservationResponseDto from(ReservationQueryDto reservation) {
        ReservationResponseDto response = new ReservationResponseDto();
        response.reservationId = reservation.getReservationId();
        response.postTitle = reservation.getPostTitle();
        response.postProductImages = reservation.getPostProductImages();
        response.startDate = reservation.getStartDate();
        response.endDate = reservation.getEndDate();
        response.rentalFee = reservation.getRentalFee();
        response.deposit = reservation.getDeposit();
        response.status = reservation.getStatus();
        response.ownerName = reservation.getOwnerName();
        response.ownerProfileImageUrl = reservation.getOwnerProfileImageUrl();
        response.renterName = reservation.getRenterName();
        response.renterProfileImageUrl = reservation.getRenterProfileImageUrl();
        return response;
    }
}

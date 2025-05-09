package com.nextdoor.nextdoor.domain.reservation.controller.dto.response;

import com.nextdoor.nextdoor.domain.reservation.domain.Reservation;
import com.nextdoor.nextdoor.domain.reservation.service.dto.PostDto;
import com.nextdoor.nextdoor.domain.reservation.service.dto.ReservationQueryDto;
import lombok.Getter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
public class ReservationResponseDto {

    private Long reservationId;
    private String feedTitle;
    private String feedProductImage;
    private LocalDate startDate;
    private LocalDate endDate;
    private BigDecimal rentalFee;
    private BigDecimal deposit;
    private String status;
    private String ownerName;
    private String ownerProfileImageUrl;

    public static ReservationResponseDto from(Reservation reservation, PostDto post) {
        ReservationResponseDto response = new ReservationResponseDto();
        response.reservationId = reservation.getId();
        response.feedTitle = post.getTitle();
        response.feedProductImage = post.getProductImage();
        response.startDate = reservation.getStartDate();
        response.endDate = reservation.getEndDate();
        response.rentalFee = reservation.getRentalFee();
        response.deposit = reservation.getDeposit();
        response.status = reservation.getStatus().name();
        response.ownerName = post.getAuthorName();
        response.ownerProfileImageUrl = post.getAuthorProfileImageUrl();
        return response;
    }

    public static ReservationResponseDto from(ReservationQueryDto reservation) {
        ReservationResponseDto response = new ReservationResponseDto();
        response.reservationId = reservation.getReservationId();
        response.feedTitle = reservation.getFeedTitle();
        response.feedProductImage = reservation.getFeedProductImage();
        response.startDate = reservation.getStartDate();
        response.endDate = reservation.getEndDate();
        response.rentalFee = reservation.getRentalFee();
        response.deposit = reservation.getDeposit();
        response.status = reservation.getStatus();
        response.ownerName = reservation.getOwnerName();
        response.ownerProfileImageUrl = reservation.getOwnerProfileImageUrl();
        return response;
    }
}

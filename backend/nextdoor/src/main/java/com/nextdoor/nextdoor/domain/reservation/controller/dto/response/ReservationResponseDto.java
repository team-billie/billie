package com.nextdoor.nextdoor.domain.reservation.controller.dto.response;

import com.nextdoor.nextdoor.domain.reservation.domain.Reservation;
import com.nextdoor.nextdoor.domain.reservation.enums.ReservationStatus;
import com.nextdoor.nextdoor.domain.reservation.service.dto.FeedDto;
import com.nextdoor.nextdoor.domain.reservation.service.dto.MemberDto;
import lombok.Getter;

import java.time.LocalDate;

@Getter
public class ReservationResponseDto {

    private String feedTitle;
    private String feedProductImage;
    private LocalDate startDate;
    private LocalDate endDate;
    private Long rentalFee;
    private Long deposit;
    private ReservationStatus status;
    private String ownerName;
    private String ownerProfileImageUrl;

    public static ReservationResponseDto from(Reservation reservation, FeedDto feed, MemberDto owner) {
        ReservationResponseDto response = new ReservationResponseDto();
        response.feedTitle = feed.getTitle();
        response.feedProductImage = feed.getProductImage();
        response.startDate = reservation.getStartDate();
        response.endDate = reservation.getEndDate();
        response.rentalFee = reservation.getRentalFee();
        response.deposit = reservation.getDeposit();
        response.status = reservation.getStatus();
        response.ownerName = owner.getName();
        response.ownerProfileImageUrl = owner.getProfileImageUrl();
        return response;
    }
}

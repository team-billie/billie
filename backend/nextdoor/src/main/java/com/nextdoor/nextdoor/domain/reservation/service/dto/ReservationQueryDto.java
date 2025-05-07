package com.nextdoor.nextdoor.domain.reservation.service.dto;

import com.nextdoor.nextdoor.domain.reservation.domain.Reservation;
import lombok.Builder;
import lombok.Getter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Builder
@Getter
public class ReservationQueryDto {

    private Long reservationId;
    private LocalDate startDate;
    private LocalDate endDate;
    private BigDecimal rentalFee;
    private BigDecimal deposit;
    private String status;
    private Long rentalId;
    private Long ownerId;
    private String ownerName;
    private String ownerProfileImageUrl;
    private Long renterId;
    private Long feedId;
    private String feedTitle;
    private String feedProductImage;

    public static ReservationQueryDto from(Reservation reservation) {
        return builder()
                .reservationId(reservation.getId())
                .startDate(reservation.getStartDate())
                .endDate(reservation.getEndDate())
                .rentalFee(reservation.getRentalFee())
                .deposit(reservation.getDeposit())
                .status(reservation.getStatus().name())
                .rentalId(reservation.getRentalId())
                .ownerId(reservation.getOwnerId())
                .ownerName("Temp name")
                .ownerProfileImageUrl("Temp profile image URL")
                .renterId(reservation.getRenterId())
                .feedId(reservation.getFeedId())
                .feedTitle("Temp feed title")
                .feedProductImage("Temp feed product image")
                .build();
    }
}

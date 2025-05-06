package com.nextdoor.nextdoor.domain.rental.service.dto;

import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReservationDto {

    private Long reservationId;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private BigDecimal rentalFee; //Per Day
    private BigDecimal deposit;
    private String reservationStatus;
    private Long ownerId;
    private Long renterId;
    private Long feedId;
}

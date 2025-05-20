package com.nextdoor.nextdoor.domain.chat.dto;

import com.nextdoor.nextdoor.domain.reservation.enums.ReservationStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO for reservation information needed by chat domain
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReservationDto {
    private Long id;
    private ReservationStatus status;
    private Long rentalId;
}
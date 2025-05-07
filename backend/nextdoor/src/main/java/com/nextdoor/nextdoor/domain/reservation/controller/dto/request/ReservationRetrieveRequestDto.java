package com.nextdoor.nextdoor.domain.reservation.controller.dto.request;

import com.nextdoor.nextdoor.domain.reservation.enums.ReservationStatus;
import lombok.Getter;

@Getter
public class ReservationRetrieveRequestDto {

    private ReservationStatus status;
    private Long cursorId;
    private Integer pageSize;
}

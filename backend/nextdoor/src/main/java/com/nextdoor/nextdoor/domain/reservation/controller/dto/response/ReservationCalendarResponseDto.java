package com.nextdoor.nextdoor.domain.reservation.controller.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDate;
import java.util.List;

@AllArgsConstructor
@Getter
public class ReservationCalendarResponseDto {

    List<Period> periods;

    @AllArgsConstructor
    @Getter
    public static class Period {

        LocalDate startDate;
        LocalDate endDate;
    }
}

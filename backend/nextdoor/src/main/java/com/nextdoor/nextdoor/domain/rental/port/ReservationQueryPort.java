package com.nextdoor.nextdoor.domain.rental.port;

import com.nextdoor.nextdoor.domain.rental.service.dto.ReservationDto;

import java.util.Optional;

public interface ReservationQueryPort {

    Optional<ReservationDto> getReservationByRentalId(Long rentalId);
}
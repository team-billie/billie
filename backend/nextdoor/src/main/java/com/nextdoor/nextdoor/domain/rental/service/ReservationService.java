package com.nextdoor.nextdoor.domain.rental.service;

import com.nextdoor.nextdoor.domain.rental.service.dto.ReservationDto;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public interface ReservationService {

    Optional<ReservationDto> getReservationByOwnerId(Long ownerId);
    Optional<ReservationDto> getReservationByRenterId(Long renterId);
}

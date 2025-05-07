package com.nextdoor.nextdoor.domain.rental.port;

import com.nextdoor.nextdoor.domain.rental.service.dto.ReservationDto;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ReservationQueryPort {

    ReservationDto getReservationByRentalId(Long rentalId);
    List<ReservationDto> getReservationsByOwnerId(Long ownerId, Pageable pageable);
    List<ReservationDto> getReservationsByRenterId(Long renterId, Pageable pageable);
    long countReservations(Long userId, String userRole);
}
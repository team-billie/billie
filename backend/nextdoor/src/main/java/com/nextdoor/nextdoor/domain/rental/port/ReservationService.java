package com.nextdoor.nextdoor.domain.rental.port;

import com.nextdoor.nextdoor.domain.rental.service.dto.ReservationDto;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ReservationService {

    List<ReservationDto> getReservationsByOwnerId(Long ownerId, Pageable pageable);
    List<ReservationDto> getReservationsByRenterId(Long renterId, Pageable pageable);
    long countReservations(Long userId, String userRole);
}

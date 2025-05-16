package com.nextdoor.nextdoor.domain.reservation.port;

import com.nextdoor.nextdoor.domain.reservation.service.dto.ReservationMemberQueryDto;

import java.util.Optional;

public interface ReservationMemberQueryPort {

    Optional<ReservationMemberQueryDto> findById(Long id);
}

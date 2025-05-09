package com.nextdoor.nextdoor.domain.reservation.port;

import com.nextdoor.nextdoor.domain.reservation.service.dto.PostDto;

import java.util.Optional;

public interface ReservationPostQueryPort {

    Optional<PostDto> findById(Long feedId);
}

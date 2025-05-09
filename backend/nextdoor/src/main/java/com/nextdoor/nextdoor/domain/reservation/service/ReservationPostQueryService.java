package com.nextdoor.nextdoor.domain.reservation.service;

import com.nextdoor.nextdoor.domain.reservation.service.dto.PostDto;

public interface ReservationPostQueryService {

    PostDto findById(Long feedId);
}

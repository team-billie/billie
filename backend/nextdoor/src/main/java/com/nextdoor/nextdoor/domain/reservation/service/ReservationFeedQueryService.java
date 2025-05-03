package com.nextdoor.nextdoor.domain.reservation.service;

import com.nextdoor.nextdoor.domain.reservation.service.dto.FeedDto;

public interface ReservationFeedQueryService {

    FeedDto findById(Long feedId);
}

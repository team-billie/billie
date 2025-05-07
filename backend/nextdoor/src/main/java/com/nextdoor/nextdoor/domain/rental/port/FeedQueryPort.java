package com.nextdoor.nextdoor.domain.rental.port;

import com.nextdoor.nextdoor.domain.rental.service.dto.FeedDto;

import java.util.List;

public interface FeedQueryPort {

    List<FeedDto> getFeedsByIds(List<Long> ids);
}
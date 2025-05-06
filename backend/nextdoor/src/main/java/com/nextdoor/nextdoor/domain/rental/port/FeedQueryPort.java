package com.nextdoor.nextdoor.domain.rental.port;

import com.nextdoor.nextdoor.common.OutboundPort;
import com.nextdoor.nextdoor.domain.rental.service.dto.FeedDto;

import java.util.List;

@OutboundPort
public interface FeedQueryPort {

    List<FeedDto> getFeedsByIds(List<Long> ids);
}
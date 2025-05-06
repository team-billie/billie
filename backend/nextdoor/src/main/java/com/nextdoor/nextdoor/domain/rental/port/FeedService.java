package com.nextdoor.nextdoor.domain.rental.port;

import com.nextdoor.nextdoor.domain.rental.service.dto.FeedDto;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface FeedService {

    List<FeedDto> getFeedsByIds(List<Long> ids);
}

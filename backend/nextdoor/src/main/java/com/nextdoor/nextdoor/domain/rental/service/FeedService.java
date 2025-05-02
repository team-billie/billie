package com.nextdoor.nextdoor.domain.rental.service;

import com.nextdoor.nextdoor.domain.rental.service.dto.FeedDto;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public interface FeedService {

    Optional<FeedDto> getFeedById(Long id);
}

package com.nextdoor.nextdoor.domain.reservation.service;

import com.nextdoor.nextdoor.domain.reservation.service.dto.FeedDto;
import org.springframework.stereotype.Service;

@Service
public class TempReservationFeedQueryServiceImpl implements ReservationFeedQueryService {

    @Override
    public FeedDto findById(Long feedId) {
        return FeedDto.builder()
                .feedId(feedId)
                .title("Temp Feed")
                .authorId(1L)
                .category("Temp category")
                .content("Temp content")
                .deposit(100000L)
                .rentalFee(10000L)
                .build();
    }
}

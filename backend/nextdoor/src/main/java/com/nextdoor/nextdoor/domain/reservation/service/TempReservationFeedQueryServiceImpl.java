package com.nextdoor.nextdoor.domain.reservation.service;

import com.nextdoor.nextdoor.domain.reservation.service.dto.FeedDto;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

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
                .deposit(BigDecimal.valueOf(100000L))
                .rentalFee(BigDecimal.valueOf(10000L))
                .build();
    }
}

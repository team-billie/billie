package com.nextdoor.nextdoor.domain.reservation.service;

import com.nextdoor.nextdoor.domain.reservation.service.dto.PostDto;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
public class TempReservationPostQueryServiceImpl implements ReservationPostQueryService {

    @Override
    public PostDto findById(Long feedId) {
        return PostDto.builder()
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

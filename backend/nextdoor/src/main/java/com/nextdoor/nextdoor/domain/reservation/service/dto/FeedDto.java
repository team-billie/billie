package com.nextdoor.nextdoor.domain.reservation.service.dto;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class FeedDto {

    private Long feedId;
    private String title;
    private String content;
    private Long rentalFee;
    private Long deposit;
    // TODO 장소
    private String productImage;
    private String category;
    private Long authorId;
}

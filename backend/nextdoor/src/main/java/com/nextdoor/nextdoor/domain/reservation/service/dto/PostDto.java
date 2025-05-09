package com.nextdoor.nextdoor.domain.reservation.service.dto;

import lombok.Builder;
import lombok.Getter;

import java.math.BigDecimal;

@Builder
@Getter
public class PostDto {

    private Long feedId;
    private String title;
    private String content;
    private BigDecimal rentalFee;
    private BigDecimal deposit;
    // TODO 장소
    private String productImage;
    private String category;
    private Long authorId;
}

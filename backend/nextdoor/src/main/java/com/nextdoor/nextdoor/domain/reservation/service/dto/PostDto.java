package com.nextdoor.nextdoor.domain.reservation.service.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.math.BigDecimal;

@AllArgsConstructor
@Builder
@Getter
public class PostDto {

    private Long postId;
    private String title;
    private String content;
    private BigDecimal rentalFee;
    private BigDecimal deposit;
    // TODO 장소
    private String productImage;
    private String category;
    private Long authorId;
    private String authorName;
    private String authorProfileImageUrl;
}

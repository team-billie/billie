package com.nextdoor.nextdoor.domain.reservation.service.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.List;

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

    @Setter
    private List<String> productImages;
    private String category;
    private Long authorId;
    private String authorUuid;
    private String authorName;
    private String authorProfileImageUrl;
}

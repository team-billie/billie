package com.nextdoor.nextdoor.domain.post.service.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SearchPostResult {

    private Long postId;
    private String title;
    private String productImage;
    private Long rentalFee;
    private Long deposit;
    private int likeCount;
    private int dealCount;
}
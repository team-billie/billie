package com.nextdoor.nextdoor.domain.post.controller.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PostListResponse {

    private Long postId;
    private String title;
    private String productImage;
    private String rentalFee;
    private String deposit;
    private int likeCount;
    private int dealCount;
}
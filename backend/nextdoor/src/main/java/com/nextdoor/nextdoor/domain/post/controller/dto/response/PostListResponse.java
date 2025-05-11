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

    private String title;
    private String productImage;
    private String rentalFee;
    private String deposit;
    private int like;
    private int dealCount;
}
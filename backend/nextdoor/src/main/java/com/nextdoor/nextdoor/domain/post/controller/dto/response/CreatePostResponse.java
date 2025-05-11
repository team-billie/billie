package com.nextdoor.nextdoor.domain.post.controller.dto.response;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class CreatePostResponse {
    private Long id;
    private String title;
    private String content;
    private String category;
    private String rentalFee;
    private String deposit;
    private String preferredLocation;
    private Long authorId;
    private List<String> productImageUrls;
}
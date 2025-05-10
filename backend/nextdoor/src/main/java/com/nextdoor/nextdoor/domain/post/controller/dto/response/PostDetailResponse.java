package com.nextdoor.nextdoor.domain.post.controller.dto.response;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class PostDetailResponse {
    private String title;
    private String content;
    private Long rentalFee;
    private Long deposit;
    private String address;
    private String location;
    private List<String> productImage;
    private String category;
    private Long authorId;
    private String nickname;
}
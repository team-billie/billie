package com.nextdoor.nextdoor.domain.post.service.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
@AllArgsConstructor
public class PostDetailResult {
    private String title;
    private String content;
    private Long rentalFee;
    private Long deposit;
    private String address;
    private String location;
    private List<String> productImages;
    private String category;
    private String nickname;
}
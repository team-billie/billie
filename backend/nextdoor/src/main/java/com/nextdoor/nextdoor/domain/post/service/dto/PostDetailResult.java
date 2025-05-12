package com.nextdoor.nextdoor.domain.post.service.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PostDetailResult {
    private String title;
    private String content;
    private int rentalFee;
    private int deposit;
    private String address;
    private LocationDto location;
    private List<String> productImages;
    private String category;
    private String nickname;
}
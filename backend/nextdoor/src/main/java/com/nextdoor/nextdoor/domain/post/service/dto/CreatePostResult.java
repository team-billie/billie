package com.nextdoor.nextdoor.domain.post.service.dto;

import com.nextdoor.nextdoor.domain.post.domain.Category;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class CreatePostResult {
    private Long id;
    private String title;
    private String content;
    private Category category;
    private Long rentalFee;
    private Long deposit;
    private String address;
    private LocationDto preferredLocation;
    private Long authorId;
    private List<String> productImageUrls;
}
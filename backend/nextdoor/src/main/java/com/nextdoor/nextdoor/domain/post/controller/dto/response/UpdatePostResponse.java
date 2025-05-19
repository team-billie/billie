package com.nextdoor.nextdoor.domain.post.controller.dto.response;

import com.nextdoor.nextdoor.domain.post.service.dto.LocationDto;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class UpdatePostResponse {
    private Long id;
    private String title;
    private String content;
    private String category;
    private String rentalFee;
    private String deposit;
    private String address;
    private LocationDto preferredLocation;
    private Long authorId;
    private List<String> productImageUrls;
}
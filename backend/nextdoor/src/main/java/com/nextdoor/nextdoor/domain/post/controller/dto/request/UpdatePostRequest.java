package com.nextdoor.nextdoor.domain.post.controller.dto.request;

import com.nextdoor.nextdoor.domain.post.domain.Category;
import com.nextdoor.nextdoor.domain.post.service.dto.LocationDto;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdatePostRequest {

    private String title;
    private String content;
    private Category category;
    private Integer rentalFee;
    private Integer deposit;
    private String address;
    private LocationDto preferredLocation;
}
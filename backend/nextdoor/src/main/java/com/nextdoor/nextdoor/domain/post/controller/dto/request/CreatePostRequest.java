package com.nextdoor.nextdoor.domain.post.controller.dto.request;

import com.nextdoor.nextdoor.domain.post.domain.Category;
import com.nextdoor.nextdoor.domain.post.service.dto.LocationDto;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreatePostRequest {

    @NotBlank(message = "제목은 필수입니다")
    private String title;

    @NotBlank(message = "내용은 필수입니다")
    private String content;

    @NotNull(message = "카테고리는 필수입니다")
    private Category category;

    @NotNull(message = "대여료는 필수입니다")
    private Integer rentalFee;

    @NotNull(message = "보증금은 필수입니다")
    private Integer deposit;

    @NotNull(message = "사용자 지역은 필수입니다")
    private String address;

    private LocationDto preferredLocation;
}

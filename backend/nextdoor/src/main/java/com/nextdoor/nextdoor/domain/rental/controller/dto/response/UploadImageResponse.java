package com.nextdoor.nextdoor.domain.rental.controller.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
public class UploadImageResponse {

    private Long rentalId;
    private String imageUrl;
    private LocalDateTime uploadedAt;
}

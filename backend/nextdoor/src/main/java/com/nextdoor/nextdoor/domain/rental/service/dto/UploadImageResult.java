package com.nextdoor.nextdoor.domain.rental.service.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
@AllArgsConstructor
public class UploadImageResult {

    private Long rentalId;
    private String type;
    private String imageUrl;
    private LocalDateTime uploadedAt;
}

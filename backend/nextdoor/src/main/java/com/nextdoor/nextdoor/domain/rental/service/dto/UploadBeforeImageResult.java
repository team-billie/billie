package com.nextdoor.nextdoor.domain.rental.service.dto;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UploadBeforeImageResult {

    private Long rentalId;
    private String imageUrl;
    private LocalDateTime uploadedAt;
}
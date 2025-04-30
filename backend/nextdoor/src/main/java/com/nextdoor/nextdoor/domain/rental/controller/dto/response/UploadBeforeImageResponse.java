package com.nextdoor.nextdoor.domain.rental.controller.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
public class UploadBeforeImageResponse {

    private Long photoId;
    private Long feedId;
    private String type;
    private String imageUrl;
    private LocalDateTime uploadedAt;
}

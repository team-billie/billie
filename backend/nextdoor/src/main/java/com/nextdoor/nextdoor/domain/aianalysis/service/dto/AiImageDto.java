package com.nextdoor.nextdoor.domain.aianalysis.service.dto;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class AiImageDto {

    private Long aiImageId;
    private Type type;
    private String imageUrl;
    private String mimeType;
    private Long rentalId;

    public enum Type {

        BEFORE, AFTER
    }
}

package com.nextdoor.nextdoor.domain.aianalysis.service.dto;

import com.nextdoor.nextdoor.domain.aianalysis.enums.AiImageType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import java.util.List;

@AllArgsConstructor
@Builder
@Getter
public class RentalDto {

    private Long rentalId;
    private Long reservationId;
    private String rentalStatus;
    private String damageAnalysis;
    private List<AiImageDto> aiImages;

    @AllArgsConstructor
    @Builder
    @Getter
    @ToString
    public static class AiImageDto {

        private Long aiImageId;
        private AiImageType type;
        private String imageUrl;
        private String mimeType;
        private Long rentalId;
    }
}

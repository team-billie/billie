package com.nextdoor.nextdoor.domain.aianalysis.service.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

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
    public static class AiImageDto {

        private Long aiImageId;
        private Type type;
        private String imageUrl;
        private String mimeType;
        private Long rentalId;

        public enum Type {

            BEFORE, AFTER
        }
    }
}

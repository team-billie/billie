package com.nextdoor.nextdoor.domain.rental.mapper;

import com.nextdoor.nextdoor.domain.rental.controller.dto.request.UploadBeforeImageRequest;
import com.nextdoor.nextdoor.domain.rental.controller.dto.response.UploadBeforeImageResponse;
import com.nextdoor.nextdoor.domain.rental.service.dto.UploadBeforeImageCommand;
import com.nextdoor.nextdoor.domain.rental.service.dto.UploadBeforeImageResult;
import org.springframework.stereotype.Component;

@Component
public class RentalMapper {

    public UploadBeforeImageCommand toCommand(Long rentalId, UploadBeforeImageRequest request) {
        return new UploadBeforeImageCommand(
                rentalId,
                request.getFile(),
                request.getType()
        );
    }

    public UploadBeforeImageResponse toResponse(UploadBeforeImageResult result) {
        return UploadBeforeImageResponse.builder()
                .photoId(result.getPhotoId())
                .photoId(result.getPhotoId())
                .type(result.getType())
                .imageUrl(result.getImageUrl())
                .uploadedAt(result.getUploadedAt())
                .build();
    }
}

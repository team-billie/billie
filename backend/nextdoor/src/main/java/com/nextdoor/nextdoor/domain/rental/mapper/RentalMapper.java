package com.nextdoor.nextdoor.domain.rental.mapper;

import com.nextdoor.nextdoor.domain.rental.controller.dto.request.RequestRemittanceRequest;
import com.nextdoor.nextdoor.domain.rental.controller.dto.request.UploadImageRequest;
import com.nextdoor.nextdoor.domain.rental.controller.dto.response.UploadImageResponse;
import com.nextdoor.nextdoor.domain.rental.service.dto.RequestRemittanceCommand;
import com.nextdoor.nextdoor.domain.rental.service.dto.UploadImageCommand;
import com.nextdoor.nextdoor.domain.rental.service.dto.UploadImageResult;
import org.springframework.stereotype.Component;

@Component
public class RentalMapper {

    public UploadImageCommand toUploadImageCommand(Long rentalId, UploadImageRequest request) {
        return new UploadImageCommand(
                rentalId,
                request.getFile()
        );
    }

    public UploadImageResponse toUploadImageResponse(UploadImageResult result) {
        return UploadImageResponse.builder()
                .rentalId(result.getRentalId())
                .imageUrl(result.getImageUrl())
                .uploadedAt(result.getUploadedAt())
                .build();
    }

    public RequestRemittanceCommand toCommand(Long rentalId, RequestRemittanceRequest request) {
        return new RequestRemittanceCommand(
                rentalId,
                request.getRenterId(),
                request.getRemittanceAmount()
        );
    }
}



package com.nextdoor.nextdoor.domain.rental.mapper;

import com.nextdoor.nextdoor.domain.rental.controller.dto.request.RequestRemittanceRequest;
import com.nextdoor.nextdoor.domain.rental.controller.dto.request.UploadBeforeImageRequest;
import com.nextdoor.nextdoor.domain.rental.controller.dto.response.UploadBeforeImageResponse;
import com.nextdoor.nextdoor.domain.rental.service.dto.RequestRemittanceCommand;
import com.nextdoor.nextdoor.domain.rental.service.dto.UploadBeforeImageCommand;
import com.nextdoor.nextdoor.domain.rental.service.dto.UploadBeforeImageResult;
import org.springframework.stereotype.Component;

@Component
public class RentalMapper {

    public UploadBeforeImageCommand toCommand(Long rentalId, UploadBeforeImageRequest request) {
        return new UploadBeforeImageCommand(
                rentalId,
                request.getFile()
        );
    }

    public UploadBeforeImageResponse toResponse(UploadBeforeImageResult result) {
        return UploadBeforeImageResponse.builder()
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

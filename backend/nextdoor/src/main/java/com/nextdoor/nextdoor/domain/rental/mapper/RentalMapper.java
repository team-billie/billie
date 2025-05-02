package com.nextdoor.nextdoor.domain.rental.mapper;

import com.nextdoor.nextdoor.domain.rental.controller.dto.request.RequestRemittanceRequest;
import com.nextdoor.nextdoor.domain.rental.controller.dto.request.RetrieveRentalsRequest;
import com.nextdoor.nextdoor.domain.rental.controller.dto.request.UploadImageRequest;
import com.nextdoor.nextdoor.domain.rental.controller.dto.response.RentalDetailResponse;
import com.nextdoor.nextdoor.domain.rental.controller.dto.response.UploadImageResponse;
import com.nextdoor.nextdoor.domain.rental.service.dto.*;
import org.springframework.data.domain.Pageable;
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

    public SearchRentalCommand toCommand(Long userId,
                                               RetrieveRentalsRequest request,
                                               Pageable pageable) {
        return SearchRentalCommand.builder()
                .userId(userId)
                .userRole(request.getUserRole())
                .condition(request.getCondition())
                .pageable(pageable)
                .build();
    }

    public RentalDetailResponse toResponse(SearchRentalResult result) {
        return RentalDetailResponse.builder()
                .reservationId(result.getReservationId())
                .startDate(result.getStartDate())
                .endDate(result.getEndDate())
                .rentalFee(result.getRentalFee())
                .deposit(result.getDeposit())
                .reservationStatus(result.getReservationStatus())
                .ownerId(result.getOwnerId())
                .renterId(result.getRenterId())
                .rentalId(result.getRentalId())
                .rentalStatus(result.getRentalStatus())
                .title(result.getTitle())
                .productImageUrl(result.getProductImageUrl())
                .build();
    }
}



package com.nextdoor.nextdoor.domain.rental.mapper;

import com.nextdoor.nextdoor.domain.rental.controller.dto.request.RequestRemittanceRequest;
import com.nextdoor.nextdoor.domain.rental.controller.dto.request.RetrieveRentalsRequest;
import com.nextdoor.nextdoor.domain.rental.controller.dto.request.UpdateAccountRequest;
import com.nextdoor.nextdoor.domain.rental.controller.dto.request.UploadImageRequest;
import com.nextdoor.nextdoor.domain.rental.controller.dto.response.AiAnalysisResponse;
import com.nextdoor.nextdoor.domain.rental.controller.dto.response.RemittanceResponse;
import com.nextdoor.nextdoor.domain.rental.controller.dto.response.RentalDetailResponse;
import com.nextdoor.nextdoor.domain.rental.controller.dto.response.UpdateAccountResponse;
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

    public RequestRemittanceCommand toCommand(Long rentalId) {
        return RequestRemittanceCommand.builder()
                .rentalId(rentalId)
                .build();
    }

    public RemittanceResponse toResponse(RequestRemittanceResult result) {
        return RemittanceResponse.builder()
                .ownerNickname(result.getOwnerNickname())
                .rentalFee(result.getRentalFee())
                .deposit(result.getDeposit())
                .build();
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
                .reservationId(result.getId())
                .startDate(result.getStartDate())
                .endDate(result.getEndDate())
                .rentalFee(result.getRentalFee())
                .deposit(result.getDeposit())
                .ownerId(result.getOwnerId())
                .renterId(result.getRenterId())
                .rentalId(result.getRentalId())
                .rentalProcess(result.getRentalProcess())
                .rentalStatus(result.getRentalStatus())
                .title(result.getTitle())
                .productImageUrls(result.getProductImages())
                .build();
    }

    public AiAnalysisResponse toResponse(AiAnalysisResult result) {
        return AiAnalysisResponse.builder()
                .beforeImages(result.getBeforeImages())
                .afterImages(result.getAfterImages())
                .analysis(result.getAnalysis())
                .build();
    }

    public UpdateAccountCommand toUpdateAccountCommand(Long rentalId, UpdateAccountRequest request) {
        return UpdateAccountCommand.builder()
                .rentalId(rentalId)
                .accountNo(request.getAccountNo())
                .bankCode(request.getBankCode())
                .build();
    }

    public UpdateAccountResponse toUpdateAccountResponse(UpdateAccountResult result) {
        return UpdateAccountResponse.builder()
                .rentalId(result.getRentalId())
                .accountNo(result.getAccountNo())
                .bankCode(result.getBankCode())
                .build();
    }
}

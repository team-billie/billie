package com.nextdoor.nextdoor.domain.rental.mapper;

import com.nextdoor.nextdoor.domain.rental.controller.dto.request.RequestRemittanceRequest;
import com.nextdoor.nextdoor.domain.rental.controller.dto.request.RetrieveRentalsRequest;
import com.nextdoor.nextdoor.domain.rental.controller.dto.request.UpdateAccountRequest;
import com.nextdoor.nextdoor.domain.rental.controller.dto.request.UploadImageRequest;
import com.nextdoor.nextdoor.domain.rental.controller.dto.response.AiAnalysisResponse;
import com.nextdoor.nextdoor.domain.rental.controller.dto.response.DeleteRentalResponse;
import com.nextdoor.nextdoor.domain.rental.controller.dto.response.ManagedRentalCountResponse;
import com.nextdoor.nextdoor.domain.rental.controller.dto.response.RemittanceResponse;
import com.nextdoor.nextdoor.domain.rental.controller.dto.response.RentalDetailResponse;
import com.nextdoor.nextdoor.domain.rental.controller.dto.response.UpdateAccountResponse;
import com.nextdoor.nextdoor.domain.rental.controller.dto.response.UploadImageResponse;
import com.nextdoor.nextdoor.domain.rental.service.dto.*;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;

@Component
public class RentalMapper {

    public UploadImageCommand toUploadImageCommand(Long userId, Long rentalId, UploadImageRequest request) {
        return new UploadImageCommand(
                userId,
                rentalId,
                request.getImages()
        );
    }

    public UploadImageResponse toUploadImageResponse(UploadImageResult result) {
        return UploadImageResponse.builder()
                .rentalId(result.getRentalId())
                .imageUrls(result.getImageUrls())
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
                .rentalFee(result.getFinalAmount())
                .deposit(result.getDeposit())
                .accountNo(result.getAccountNo())
                .bankCode(result.getBankCode())
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
                .createdAt(result.getCreatedAt())
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
                .finalAmount(request.getFinalAmount())
                .build();
    }

    public UpdateAccountResponse toUpdateAccountResponse(UpdateAccountResult result) {
        return UpdateAccountResponse.builder()
                .rentalId(result.getRentalId())
                .accountNo(result.getAccountNo())
                .bankCode(result.getBankCode())
                .finalAmount(result.getFinalAmount())
                .build();
    }

    public ManagedRentalCountResponse toManagedRentalCountResponse(ManagedRentalCountResult result) {
        return ManagedRentalCountResponse.builder()
                .managedRentalCount(result.getManagedRentalCount())
                .build();
    }

    public DeleteRentalCommand toDeleteCommand(Long rentalId) {
        return DeleteRentalCommand.builder()
                .rentalId(rentalId)
                .build();
    }

    public DeleteRentalResponse toDeleteResponse(DeleteRentalResult result) {
        return DeleteRentalResponse.builder()
                .rentalId(result.getRentalId())
                .success(result.isSuccess())
                .message(result.getMessage())
                .build();
    }
}

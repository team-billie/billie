package com.nextdoor.nextdoor.domain.rental.controller;

import com.nextdoor.nextdoor.domain.rental.controller.dto.request.RetrieveRentalsRequest;
import com.nextdoor.nextdoor.domain.rental.controller.dto.request.UpdateAccountRequest;
import com.nextdoor.nextdoor.domain.rental.controller.dto.request.UploadImageRequest;
import com.nextdoor.nextdoor.domain.rental.controller.dto.response.AiAnalysisResponse;
import com.nextdoor.nextdoor.domain.rental.controller.dto.response.ManagedRentalCountResponse;
import com.nextdoor.nextdoor.domain.rental.controller.dto.response.RemittanceResponse;
import com.nextdoor.nextdoor.domain.rental.controller.dto.response.RentalDetailResponse;
import com.nextdoor.nextdoor.domain.rental.controller.dto.response.UpdateAccountResponse;
import com.nextdoor.nextdoor.domain.rental.controller.dto.response.UploadImageResponse;
import com.nextdoor.nextdoor.domain.rental.mapper.RentalMapper;
import com.nextdoor.nextdoor.domain.rental.service.RentalService;
import com.nextdoor.nextdoor.domain.rental.service.dto.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/v1/rentals")
@RequiredArgsConstructor
public class RentalController {

    private final RentalService rentalService;
    private final RentalMapper rentalMapper;

    @GetMapping
    public ResponseEntity<Page<RentalDetailResponse>> getMyRentals(
            @RequestParam Long userId,
            @RequestParam String userRole,
            @RequestParam String condition,
            @PageableDefault(size = 10, sort = "createdAt", direction = Sort.Direction.DESC)
            Pageable pageable
    ) {
        RetrieveRentalsRequest retrieveRentalsRequest = new RetrieveRentalsRequest(userRole, condition);
        SearchRentalCommand command = rentalMapper.toCommand(userId, retrieveRentalsRequest, pageable);
        Page<SearchRentalResult> results = rentalService.searchRentals(command);
        Page<RentalDetailResponse> responsePage = results.map(rentalMapper::toResponse);

        return ResponseEntity.ok(responsePage);
    }

    @PostMapping("/{rentalId}/before/photos")
    public ResponseEntity<UploadImageResponse> registerBeforePhoto(
            @AuthenticationPrincipal Long userId,
            @PathVariable Long rentalId,
            @RequestParam("file") List<MultipartFile> images) {

        UploadImageRequest request = UploadImageRequest.builder()
                .images(images)
                .build();

        UploadImageCommand command = rentalMapper.toUploadImageCommand(userId, rentalId, request);
        UploadImageResult result = rentalService.registerBeforePhoto(command);
        UploadImageResponse response = rentalMapper.toUploadImageResponse(result);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/{rentalId}/request-remittance")
    public ResponseEntity<RemittanceResponse> requestRemittance(@PathVariable Long rentalId) {
        RequestRemittanceCommand command = rentalMapper.toCommand(rentalId);
        RequestRemittanceResult result = rentalService.requestRemittance(command);
        RemittanceResponse response = rentalMapper.toResponse(result);

        return ResponseEntity.ok(response);
    }

    @PostMapping("/{rentalId}/after/photos")
    public ResponseEntity<UploadImageResponse> registerAfterPhoto(
            @AuthenticationPrincipal Long userId,
            @PathVariable Long rentalId,
            @RequestParam("file") List<MultipartFile> images) {

        UploadImageRequest request = UploadImageRequest.builder()
                .images(images)
                .build();

        UploadImageCommand command = rentalMapper.toUploadImageCommand(userId, rentalId, request);
        UploadImageResult result = rentalService.registerAfterPhoto(command);
        UploadImageResponse response = rentalMapper.toUploadImageResponse(result);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/{rentalId}/ai-analysis")
    ResponseEntity<AiAnalysisResponse> getAiAnalysis(@PathVariable Long rentalId){
        AiAnalysisResult result = rentalService.getAiAnalysis(rentalId);
        AiAnalysisResponse response = rentalMapper.toResponse(result);

        return ResponseEntity.ok(response);
    }

    @PatchMapping("/{rentalId}/account")
    public ResponseEntity<UpdateAccountResponse> updateAccount(
            @PathVariable Long rentalId,
            @RequestBody UpdateAccountRequest request) {

        UpdateAccountCommand command = rentalMapper.toUpdateAccountCommand(rentalId, request);
        UpdateAccountResult result = rentalService.updateAccount(command);
        UpdateAccountResponse response = rentalMapper.toUpdateAccountResponse(result);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/managed-count")
    public ResponseEntity<ManagedRentalCountResponse> getManagedRentalCount(
            @RequestParam Long userId) {

        ManagedRentalCountResult result = rentalService.countManagedRentals(userId);
        ManagedRentalCountResponse response = rentalMapper.toManagedRentalCountResponse(result);

        return ResponseEntity.ok(response);
    }
}

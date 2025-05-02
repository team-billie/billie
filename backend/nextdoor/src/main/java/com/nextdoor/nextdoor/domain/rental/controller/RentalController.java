package com.nextdoor.nextdoor.domain.rental.controller;

import com.nextdoor.nextdoor.domain.rental.controller.dto.request.RequestRemittanceRequest;
import com.nextdoor.nextdoor.domain.rental.controller.dto.request.RetrieveRentalsRequest;
import com.nextdoor.nextdoor.domain.rental.controller.dto.request.UploadImageRequest;
import com.nextdoor.nextdoor.domain.rental.controller.dto.response.RentalDetailResponse;
import com.nextdoor.nextdoor.domain.rental.controller.dto.response.UploadImageResponse;
import com.nextdoor.nextdoor.domain.rental.mapper.RentalMapper;
import com.nextdoor.nextdoor.domain.rental.service.RentalService;
import com.nextdoor.nextdoor.domain.rental.service.dto.*;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/rentals")
@RequiredArgsConstructor
public class RentalController {

    private final RentalService rentalService;
    private final RentalMapper rentalMapper;

    @GetMapping
    public ResponseEntity<Page<RentalDetailResponse>> getMyRentals(
            Long userId,
            @ModelAttribute RetrieveRentalsRequest retrieveRentalsRequest,
            @PageableDefault(size = 10, sort = "createdAt", direction = Sort.Direction.DESC)
            Pageable pageable
    ) {
        SearchRentalCommand command = rentalMapper.toCommand(userId, retrieveRentalsRequest, pageable);
        Page<SearchRentalResult> results = rentalService.searchRentals(command);
        Page<RentalDetailResponse> responsePage =
                results.map(rentalMapper::toResponse);

        return ResponseEntity.ok(responsePage);
    }

    @PostMapping("/{rentalId}/before/photos")
    ResponseEntity<UploadImageResponse> registerBeforePhoto(@PathVariable Long rentalId,
                                                            @Valid @RequestPart UploadImageRequest request) {
        UploadImageCommand command = rentalMapper.toUploadImageCommand(rentalId, request);
        UploadImageResult result = rentalService.registerBeforePhoto(command);
        UploadImageResponse response = rentalMapper.toUploadImageResponse(result);

        return ResponseEntity.ok(response);
    }

    @PostMapping("/{rentalId}/request-remittance")
    public ResponseEntity<Void> requestPayments(@PathVariable Long rentalId,
                                                @RequestBody RequestRemittanceRequest request) {
        RequestRemittanceCommand command = rentalMapper.toCommand(rentalId, request);
        rentalService.requestRemittance(command);

        return ResponseEntity.ok().build();
    }

    @PostMapping("/{rentalId}/after/photos")
    ResponseEntity<UploadImageResponse> registerAfterPhoto(@PathVariable Long rentalId,
                                                           @Valid @RequestPart UploadImageRequest request) {
        UploadImageCommand command = rentalMapper.toUploadImageCommand(rentalId, request);
        UploadImageResult result = rentalService.registerAfterPhoto(command);
        UploadImageResponse response = rentalMapper.toUploadImageResponse(result);

        return ResponseEntity.ok(response);
    }
}

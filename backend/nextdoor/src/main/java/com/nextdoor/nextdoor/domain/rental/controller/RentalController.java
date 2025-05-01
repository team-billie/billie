package com.nextdoor.nextdoor.domain.rental.controller;

import com.nextdoor.nextdoor.domain.rental.controller.dto.request.RequestRemittanceRequest;
import com.nextdoor.nextdoor.domain.rental.controller.dto.request.UploadImageRequest;
import com.nextdoor.nextdoor.domain.rental.controller.dto.response.UploadImageResponse;
import com.nextdoor.nextdoor.domain.rental.mapper.RentalMapper;
import com.nextdoor.nextdoor.domain.rental.service.RentalService;
import com.nextdoor.nextdoor.domain.rental.service.dto.RequestRemittanceCommand;
import com.nextdoor.nextdoor.domain.rental.service.dto.UploadImageCommand;
import com.nextdoor.nextdoor.domain.rental.service.dto.UploadImageResult;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/rentals")
@RequiredArgsConstructor
public class RentalController {

    private final RentalService rentalService;
    private final RentalMapper rentalMapper;

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

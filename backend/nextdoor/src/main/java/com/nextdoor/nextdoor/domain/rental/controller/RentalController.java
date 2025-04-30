package com.nextdoor.nextdoor.domain.rental.controller;

import com.nextdoor.nextdoor.domain.rental.controller.dto.request.UploadBeforeImageRequest;
import com.nextdoor.nextdoor.domain.rental.controller.dto.response.UploadBeforeImageResponse;
import com.nextdoor.nextdoor.domain.rental.mapper.RentalMapper;
import com.nextdoor.nextdoor.domain.rental.service.RentalService;
import com.nextdoor.nextdoor.domain.rental.service.dto.UploadBeforeImageCommand;
import com.nextdoor.nextdoor.domain.rental.service.dto.UploadBeforeImageResult;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController("/api/v1/rentals")
@RequiredArgsConstructor
public class RentalController {

    private final RentalService rentalService;
    private final RentalMapper rentalMapper;

    @PostMapping("/{rentalId}/before/photos")
    ResponseEntity<UploadBeforeImageResponse> registerBeforePhoto(@PathVariable Long rentalId,
                                                                  @Valid @ModelAttribute UploadBeforeImageRequest request) {
        UploadBeforeImageCommand command = rentalMapper.toCommand(rentalId, request);
        UploadBeforeImageResult result = rentalService.registerBeforePhoto(command);
        UploadBeforeImageResponse response = rentalMapper.toResponse(result);

        return ResponseEntity.ok(response);
    }
}

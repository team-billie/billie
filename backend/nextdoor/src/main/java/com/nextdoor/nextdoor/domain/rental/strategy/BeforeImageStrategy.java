package com.nextdoor.nextdoor.domain.rental.strategy;

import com.nextdoor.nextdoor.domain.rental.domain.Rental;
import com.nextdoor.nextdoor.domain.rental.domain.AiImageType;
import com.nextdoor.nextdoor.domain.rental.domain.RentalStatus;
import com.nextdoor.nextdoor.domain.rental.exception.InvalidRentalStatusException;
import org.springframework.stereotype.Component;

@Component
public class BeforeImageStrategy implements RentalImageStrategy {

    @Override
    public void updateRentalImage(Rental rental, String imageUrl, String mimeType) {
        validateImageUploadAllowed(rental);
        rental.saveAiImage(getImageType(), imageUrl, mimeType);
    }

    @Override
    public AiImageType getImageType() {
        return AiImageType.BEFORE;
    }

    @Override
    public String createImagePath(String rentalId) {
        return "rentals/" + rentalId + "/before";
    }

    @Override
    public void validateImageUploadAllowed(Rental rental) {
        if(rental.getRentalStatus() != RentalStatus.REMITTANCE_REQUESTED) {
            throw new InvalidRentalStatusException("이미지 업로드가 불가능한 대여 상태입니다");
        }
    }
}
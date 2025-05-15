package com.nextdoor.nextdoor.domain.rental.strategy;

import com.nextdoor.nextdoor.domain.rental.domain.Rental;
import com.nextdoor.nextdoor.domain.rental.domain.AiImageType;
import com.nextdoor.nextdoor.domain.rental.domain.RentalStatus;
import com.nextdoor.nextdoor.domain.rental.exception.InvalidRentalStatusException;
import org.springframework.stereotype.Component;

@Component
public class AfterImageStrategy implements RentalImageStrategy {

    @Override
    public void updateRentalImage(Rental rental, String imageUrl, String mimeType) {
        validateImageUploadAllowed(rental);
        rental.saveAiImage(getImageType(), imageUrl, mimeType);
    }

    @Override
    public AiImageType getImageType() {
        return AiImageType.AFTER;
    }

    @Override
    public String createImagePath(String rentalId) {
        return "rentals/" + rentalId + "/after";
    }

    @Override
    public void validateImageUploadAllowed(Rental rental) {
        if(rental.getRentalStatus() != RentalStatus.RENTAL_PERIOD_ENDED){
            throw new InvalidRentalStatusException("대여 이미지 업로드 불가능.");
        }
    }
}
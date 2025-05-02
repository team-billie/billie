package com.nextdoor.nextdoor.domain.rental.strategy;

import com.nextdoor.nextdoor.domain.rental.domain.Rental;
import com.nextdoor.nextdoor.domain.rental.enums.AiImageType;
import com.nextdoor.nextdoor.domain.rental.enums.RentalStatus;
import org.springframework.stereotype.Component;

@Component
public class AfterImageStrategy implements RentalImageStrategy {

    @Override
    public void updateRentalImage(Rental rental, String imageUrl, String mimeType) {
        validateImageUploadAllowed(rental);
        rental.saveAiImage(getImageType(), imageUrl, mimeType);
        rental.updateStatus(getTargetStatus());
    }

    @Override
    public AiImageType getImageType() {
        return AiImageType.AFTER;
    }

    @Override
    public RentalStatus getTargetStatus() {
        return RentalStatus.AFTER_PHOTO_REGISTERED;
    }

    @Override
    public String createImagePath(String rentalId) {
        return "rentals/" + rentalId + "/after";
    }

    @Override
    public void validateImageUploadAllowed(Rental rental) {
        if(rental.getRentalStatus() == RentalStatus.CREATED){
            throw new IllegalArgumentException("대여 이미지 업로드 불가능.");
        }
    }
}

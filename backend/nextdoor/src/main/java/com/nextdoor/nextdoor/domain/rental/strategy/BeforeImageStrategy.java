package com.nextdoor.nextdoor.domain.rental.strategy;

import com.nextdoor.nextdoor.domain.rental.domain.Rental;
import com.nextdoor.nextdoor.domain.rental.enums.AiImageType;
import com.nextdoor.nextdoor.domain.rental.enums.RentalStatus;
import com.nextdoor.nextdoor.domain.rental.exception.InvalidRentalStatusException;
import org.springframework.stereotype.Component;

@Component
public class BeforeImageStrategy implements RentalImageStrategy {

    @Override
    public void updateRentalImage(Rental rental, String imageUrl, String mimeType) {
        validateImageUploadAllowed(rental);
        rental.saveAiImage(getImageType(), imageUrl, mimeType);
        rental.updateStatus(getTargetStatus());
    }

    @Override
    public AiImageType getImageType() {
        return AiImageType.BEFORE;
    }

    @Override
    public RentalStatus getTargetStatus() {
        return RentalStatus.BEFORE_PHOTO_REGISTERED;
    }

    @Override
    public String createImagePath(String rentalId) {
        return "rentals/" + rentalId + "/before";
    }

    @Override
    public void validateImageUploadAllowed(Rental rental) {
        if(rental.getRentalStatus() != RentalStatus.CREATED) {
            throw new InvalidRentalStatusException("이미 업로드된 이미지가 있습니다.");
        }
    }
}
package com.nextdoor.nextdoor.domain.rental.strategy;

import com.nextdoor.nextdoor.domain.rental.domain.Rental;
import com.nextdoor.nextdoor.domain.rental.enums.AiImageType;
import com.nextdoor.nextdoor.domain.rental.enums.RentalStatus;
import org.springframework.stereotype.Component;

@Component
public class AfterImageStrategy implements RentalImageStrategy {

    @Override
    public void updateRentalStatus(Rental rental, String imageUrl, String mimeType) {
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
    public boolean canRegisterImage(RentalStatus currentStatus) {
        return currentStatus == RentalStatus.ACTIVE;
    }
}

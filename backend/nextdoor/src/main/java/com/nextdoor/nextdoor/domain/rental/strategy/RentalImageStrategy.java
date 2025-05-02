package com.nextdoor.nextdoor.domain.rental.strategy;

import com.nextdoor.nextdoor.domain.rental.domain.Rental;
import com.nextdoor.nextdoor.domain.rental.enums.AiImageType;
import com.nextdoor.nextdoor.domain.rental.enums.RentalStatus;

public interface RentalImageStrategy {

    void updateRentalImage(Rental rental, String imageUrl, String mimeType);
    AiImageType getImageType();
    RentalStatus getTargetStatus();
    String createImagePath(String rentalId);
    public void validateImageUploadAllowed(Rental rental);
}

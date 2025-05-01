package com.nextdoor.nextdoor.domain.rental.strategy;

import com.nextdoor.nextdoor.domain.rental.domain.Rental;

public class AfterImageStatusStrategy implements RentalStatusStrategy {

    @Override
    public void updateRentalStatus(Rental rental, String imageUrl, String mimeType) {
        rental.saveAiImage(imageUrl, "AFTER", mimeType);
    }
}

package com.nextdoor.nextdoor.domain.rental.strategy;

import com.nextdoor.nextdoor.domain.rental.domain.Rental;

public class BeforeImageStatusStrategy implements RentalStatusStrategy {

    @Override
    public void updateRentalStatus(Rental rental, String imageUrl, String mimeType) {
        rental.saveAiImage(imageUrl, "BEFORE", mimeType);
    }
}

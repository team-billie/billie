package com.nextdoor.nextdoor.domain.rental.strategy;

import com.nextdoor.nextdoor.domain.rental.domain.Rental;

public interface RentalStatusStrategy {

    void updateRentalStatus(Rental rental, String imageUrl, String mimeType);
}

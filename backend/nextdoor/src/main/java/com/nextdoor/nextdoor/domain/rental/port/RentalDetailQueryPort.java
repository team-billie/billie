package com.nextdoor.nextdoor.domain.rental.port;

import com.nextdoor.nextdoor.domain.rental.message.RentalStatusMessage;

public interface RentalDetailQueryPort {

    RentalStatusMessage.RentalDetailResult getRentalDetailByRentalIdAndRole(Long rentalId);
}
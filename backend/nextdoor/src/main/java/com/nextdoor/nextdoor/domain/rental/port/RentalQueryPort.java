package com.nextdoor.nextdoor.domain.rental.port;

import com.nextdoor.nextdoor.domain.rental.service.dto.RequestRemittanceResult;
import com.nextdoor.nextdoor.domain.rental.service.dto.SearchRentalCommand;
import com.nextdoor.nextdoor.domain.rental.service.dto.SearchRentalResult;
import org.springframework.data.domain.Page;

import java.util.Optional;

public interface RentalQueryPort {

    Page<SearchRentalResult> searchRentals(SearchRentalCommand command);
    Optional<RequestRemittanceResult> findRemittanceRequestViewData(Long rentalId);
}

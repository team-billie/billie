package com.nextdoor.nextdoor.domain.rental.repository;

import com.nextdoor.nextdoor.domain.rental.service.dto.SearchRentalCommand;
import com.nextdoor.nextdoor.domain.rental.service.dto.SearchRentalResult;
import org.springframework.data.domain.Page;

public interface RentalCustomRepository {

    Page<SearchRentalResult> searchRental(SearchRentalCommand command);
}

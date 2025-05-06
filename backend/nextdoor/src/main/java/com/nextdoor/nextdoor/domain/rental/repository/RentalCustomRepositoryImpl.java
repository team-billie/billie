package com.nextdoor.nextdoor.domain.rental.repository;

import com.nextdoor.nextdoor.domain.rental.domain.QRental;
import com.nextdoor.nextdoor.domain.rental.service.dto.SearchRentalCommand;
import com.nextdoor.nextdoor.domain.rental.service.dto.SearchRentalResult;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class RentalCustomRepositoryImpl implements RentalCustomRepository {

    private final JPAQueryFactory jpaQueryFactory;
    private final QRental rental = QRental.rental;

    @Override
    public Page<SearchRentalResult> searchRental(SearchRentalCommand command) {
        return null;
    }
}

package com.nextdoor.nextdoor.query;

import com.nextdoor.nextdoor.common.Adapter;
import com.nextdoor.nextdoor.domain.aianalysis.port.AiAnalysisRentalQueryPort;
import com.nextdoor.nextdoor.domain.aianalysis.service.dto.RentalDto;
import com.nextdoor.nextdoor.domain.rental.domain.QRental;
import com.querydsl.core.types.ConstructorExpression;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import java.util.Optional;

@RequiredArgsConstructor
@Adapter
public class AiAnalysisRentalQueryAdapter implements AiAnalysisRentalQueryPort {

    private final JPAQueryFactory jpaQueryFactory;
    private final QRental qRental = QRental.rental;

    @Override
    public Optional<RentalDto> findById(Long id) {
        return Optional.ofNullable(jpaQueryFactory.select(createRentalDtoProjectionConstructor())
                .from(qRental)
                .where(qRental.rentalId.eq(id))
                .fetchOne());
    }

    private ConstructorExpression<RentalDto> createRentalDtoProjectionConstructor() {
        return Projections.constructor(
                RentalDto.class,
                qRental.rentalId,
                qRental.reservationId,
                qRental.rentalStatus.stringValue(),
                qRental.damageAnalysis,
                qRental.aiImages
        );
    }
}

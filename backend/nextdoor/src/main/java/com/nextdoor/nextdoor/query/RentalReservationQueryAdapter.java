package com.nextdoor.nextdoor.query;

import com.nextdoor.nextdoor.common.Adapter;
import com.nextdoor.nextdoor.domain.rentalreservation.port.ReservationQueryPort;
import com.nextdoor.nextdoor.domain.rentalreservation.service.dto.ReservationDto;
import com.nextdoor.nextdoor.domain.reservation.domain.QReservation;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import java.util.Optional;

@Adapter
@RequiredArgsConstructor
public class RentalReservationQueryAdapter implements ReservationQueryPort {

    private final JPAQueryFactory queryFactory;
    private final QReservation reservation = QReservation.reservation;

    @Override
    public Optional<ReservationDto> getReservationByRentalId(Long rentalId) {
        return Optional.ofNullable(
                queryFactory
                        .select(Projections.constructor(
                                ReservationDto.class,
                                reservation.id.as("reservationId"),
                                reservation.startDate,
                                reservation.endDate,
                                reservation.rentalFee,
                                reservation.deposit,
                                reservation.status.stringValue(),
                                reservation.ownerId,
                                reservation.renterId,
                                reservation.postId
                        ))
                        .from(reservation)
                        .where(reservation.rentalId.eq(rentalId))
                        .fetchOne()
        );
    }
}

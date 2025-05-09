package com.nextdoor.nextdoor.query;

import com.nextdoor.nextdoor.domain.reservation.controller.dto.request.ReservationRetrieveRequestDto;
import com.nextdoor.nextdoor.domain.reservation.domain.QReservation;
import com.nextdoor.nextdoor.domain.reservation.port.ReservationQueryPort;
import com.nextdoor.nextdoor.domain.reservation.service.dto.ReservationQueryDto;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@RequiredArgsConstructor
@Repository
public class ReservationQueryAdapter implements ReservationQueryPort {

    private final JPAQueryFactory jpaQueryFactory;
    private final QReservation qReservation = QReservation.reservation;

    @Override
    public List<ReservationQueryDto> findSentReservations(Long loginUserId, ReservationRetrieveRequestDto requestDto) {
        return jpaQueryFactory.select(qReservation)
                .from(qReservation)
                .where(createSentReservationCondition(loginUserId, requestDto))
                .fetch()
                .stream().map(ReservationQueryDto::from).toList();
    }

    private BooleanBuilder createSentReservationCondition(Long loginUserId, ReservationRetrieveRequestDto requestDto) {
        BooleanBuilder builder = new BooleanBuilder().and(qReservation.renterId.eq(loginUserId));
        if (requestDto.getStatus() != null) {
            builder.and(qReservation.status.eq(requestDto.getStatus()));
        }
        return builder;
    }

    @Override
    public List<ReservationQueryDto> findReceivedReservations(Long loginUserId, ReservationRetrieveRequestDto requestDto) {
        return jpaQueryFactory.select(qReservation)
                .from(qReservation)
                .where(createReceivedReservationCondition(loginUserId, requestDto))
                .fetch()
                .stream().map(ReservationQueryDto::from).toList();
    }

    private BooleanBuilder createReceivedReservationCondition(Long loginUserId, ReservationRetrieveRequestDto requestDto) {
        BooleanBuilder builder = new BooleanBuilder().and(qReservation.ownerId.eq(loginUserId));
        if (requestDto.getStatus() != null) {
            builder.and(qReservation.status.eq(requestDto.getStatus()));
        }
        return builder;
    }
}

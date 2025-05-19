//package com.nextdoor.nextdoor.query;
//
//import com.nextdoor.nextdoor.common.Adapter;
//import com.nextdoor.nextdoor.domain.chat.application.dto.ReservationDto;
//import com.nextdoor.nextdoor.domain.chat.port.ChatReservationQueryPort;
//import com.nextdoor.nextdoor.domain.reservation.domain.QReservation;
//import com.querydsl.core.types.Projections;
//import com.querydsl.jpa.impl.JPAQueryFactory;
//import lombok.RequiredArgsConstructor;
//
//import java.util.Optional;
//
//@RequiredArgsConstructor
//@Adapter
//public class ChatReservationQueryAdapter implements ChatReservationQueryPort {
//
//    private final JPAQueryFactory jpaQueryFactory;
//    private final QReservation qReservation = QReservation.reservation;
//
//    @Override
//    public Optional<ReservationDto> findByPostIdAndOwnerIdAndRenterId(Long postId, Long ownerId, Long renterId) {
//        return Optional.ofNullable(jpaQueryFactory.select(
//                        Projections.constructor(
//                                ReservationDto.class,
//                                qReservation.id,
//                                qReservation.status,
//                                qReservation.rentalId
//                        ))
//                .from(qReservation)
//                .where(qReservation.postId.eq(postId)
//                        .and(qReservation.ownerId.eq(ownerId))
//                        .and(qReservation.renterId.eq(renterId)))
//                .orderBy(qReservation.id.desc())
//                .fetchFirst());
//    }
//}
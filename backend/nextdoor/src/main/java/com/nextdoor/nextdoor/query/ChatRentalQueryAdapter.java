//package com.nextdoor.nextdoor.query;
//
//import com.nextdoor.nextdoor.common.Adapter;
//import com.nextdoor.nextdoor.domain.chat.application.dto.RentalDto;
//import com.nextdoor.nextdoor.domain.chat.port.ChatRentalQueryPort;
//import com.nextdoor.nextdoor.domain.rental.domain.QRental;
//import com.querydsl.core.types.Projections;
//import com.querydsl.jpa.impl.JPAQueryFactory;
//import lombok.RequiredArgsConstructor;
//
//import java.util.Optional;
//
//@RequiredArgsConstructor
//@Adapter
//public class ChatRentalQueryAdapter implements ChatRentalQueryPort {
//
//    private final JPAQueryFactory jpaQueryFactory;
//    private final QRental qRental = QRental.rental;
//
//    @Override
//    public Optional<RentalDto> findById(Long rentalId) {
//        return Optional.ofNullable(jpaQueryFactory.select(
//                        Projections.constructor(
//                                RentalDto.class,
//                                qRental.rentalId,
//                                qRental.rentalProcess
//                        ))
//                .from(qRental)
//                .where(qRental.rentalId.eq(rentalId))
//                .fetchOne());
//    }
//}
//package com.nextdoor.nextdoor.query;
//
//import com.nextdoor.nextdoor.common.PersistenceAdapter;
//import com.nextdoor.nextdoor.domain.rental.domain.QAiImage;
//import com.nextdoor.nextdoor.domain.rental.domain.QRental;
//import com.nextdoor.nextdoor.domain.rental.domain.RentalProcess;
//import com.nextdoor.nextdoor.domain.rental.port.RentalQueryPort;
//import com.nextdoor.nextdoor.domain.rental.service.dto.SearchRentalCommand;
//import com.nextdoor.nextdoor.domain.rental.service.dto.SearchRentalResult;
//import com.nextdoor.nextdoor.domain.reservation.domain.QReservation;
//import com.querydsl.core.BooleanBuilder;
//import com.querydsl.core.types.OrderSpecifier;
//import com.querydsl.core.types.Projections;
//import com.querydsl.core.types.dsl.BooleanExpression;
//import com.querydsl.jpa.impl.JPAQueryFactory;
//import lombok.RequiredArgsConstructor;
//import org.springframework.data.domain.Page;
//import org.springframework.data.domain.PageImpl;
//import org.springframework.data.domain.Pageable;
//import org.springframework.util.StringUtils;
//
//import java.util.List;
//
//@PersistenceAdapter
//@RequiredArgsConstructor
//public class RentalQueryRepository implements RentalQueryPort {
//
//    private final JPAQueryFactory queryFactory;
//    private final QReservation reservation = QReservation.reservation;
//    private final QRental rental = QRental.rental;
//    private final QAiImage aiImage = QAiImage.aiImage;
//
//    @Override
//    public Page<SearchRentalResult> searchRentals(SearchRentalCommand command) {
//        Long userId = command.getUserId();
//        String userRole = command.getUserRole();
//        String condition = command.getCondition();
//        Pageable pageable = command.getPageable();
//
//        BooleanBuilder whereCondition = new BooleanBuilder();
//
//        if(userRole.equalsIgnoreCase("OWNER")){
//            whereCondition.and(reservation.ownerId.eq(userId));
//        }else if(userRole.equalsIgnoreCase("RENTER")){
//            whereCondition.and(reservation.renterId.eq(userId));
//        }
//
//        whereCondition.and(rentalProcessCondition(condition));
//
//        List<SearchRentalResult> results = queryFactory
//                .select(Projections.constructor(SearchRentalResult.class,
//                        reservation.id,
//                        reservation.startDate,
//                        reservation.endDate,
//                        reservation.rentalFee,
//                        reservation.deposit,
//                        reservation.status,
//                        reservation.ownerId,
//                        reservation.renterId,
//                        rental.rentalId,
//                        rental.rentalStatus,
//                        feed.title,
//                        feed.productImageUrl))
//                .from(reservation)
//                .join(rental).on(reservation.id.eq(rental.reservationId))
//                .join(feed).on(reservation.feedId.eq(feed.feedId))
//                .where(whereCondition)
//                .offset(pageable.getOffset())
//                .limit(pageable.getPageSize())
//                .orderBy(getOrderSpecifiers(pageable))
//                .fetch();
//
//        Long total = queryFactory
//                .select(reservation.count())
//                .from(reservation)
//                .join(rental).on(reservation.id.eq(rental.reservationId))
//                .join(feed).on(reservation.feedId.eq(feed.feedId))
//                .where(whereCondition)
//                .fetchOne();
//
//        return new PageImpl<>(results, pageable, total != null ? total : 0L);
//    }
//
//    private OrderSpecifier<?>[] getOrderSpecifiers(Pageable pageable){
//        return new OrderSpecifier<?>[]{
//        };
//    }
//
//    private BooleanExpression rentalProcessCondition(String condition){
//        if(!StringUtils.hasText(condition)){
//            return null;
//        }
//
//        if (condition.contains("ACTIVE")) {
//            return rental.rentalProcess.eq(RentalProcess.RENTAL_IN_ACTIVE);
//        } else if (condition.contains("COMPLETED")) {
//            return rental.rentalProcess.eq(RentalProcess.RENTAL_COMPLETED);
//        }
//
//        return null;
//    }
//}

package com.nextdoor.nextdoor.query;

import com.nextdoor.nextdoor.common.Adapter;
import com.nextdoor.nextdoor.domain.member.domain.QMember;
import com.nextdoor.nextdoor.domain.post.domain.QPost;
import com.nextdoor.nextdoor.domain.post.domain.QProductImage;
import com.nextdoor.nextdoor.domain.rental.domain.QRental;
import com.nextdoor.nextdoor.domain.rental.domain.RentalProcess;
import com.nextdoor.nextdoor.domain.rental.port.RentalQueryPort;
import com.nextdoor.nextdoor.domain.rental.service.dto.ManagedRentalCountResult;
import com.nextdoor.nextdoor.domain.rental.service.dto.RequestRemittanceResult;
import com.nextdoor.nextdoor.domain.rental.service.dto.SearchRentalCommand;
import com.nextdoor.nextdoor.domain.rental.service.dto.SearchRentalResult;
import com.nextdoor.nextdoor.domain.reservation.domain.QReservation;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Order;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.util.StringUtils;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Adapter
@RequiredArgsConstructor
public class RentalQueryAdapter implements RentalQueryPort {

    private final JPAQueryFactory queryFactory;
    private final QReservation reservation = QReservation.reservation;
    private final QRental rental = QRental.rental;
    private final QPost post = QPost.post;
    private final QMember member = QMember.member;
    private final QMember owner = new QMember("owner");
    private final QMember renter = new QMember("renter");
    private final QProductImage productImage = QProductImage.productImage;

    @Override
    public Page<SearchRentalResult> searchRentals(SearchRentalCommand command) {
        Long userId = command.getUserId();
        String userRole = command.getUserRole();
        String condition = command.getCondition();
        Pageable pageable = command.getPageable();

        BooleanBuilder whereCondition = new BooleanBuilder();

        if(userRole.equalsIgnoreCase("OWNER")){
            whereCondition.and(reservation.ownerId.eq(userId));
        }else if(userRole.equalsIgnoreCase("RENTER")){
            whereCondition.and(reservation.renterId.eq(userId));
        }

        whereCondition.and(rentalProcessCondition(condition));

        List<SearchRentalResult> results = queryFactory
                .select(Projections.fields(SearchRentalResult.class,
                        reservation.id.as("id"),
                        reservation.postId,
                        reservation.startDate.as("startDate"),
                        reservation.endDate.as("endDate"),
                        reservation.rentalFee,
                        reservation.deposit,
                        reservation.ownerId,
                        owner.profileImageUrl.as("ownerProfileImageUrl"),
                        reservation.renterId,
                        renter.profileImageUrl.as("renterProfileImageUrl"),
                        rental.rentalId,
                        rental.rentalProcess.stringValue().as("rentalProcess"),
                        rental.rentalStatus.stringValue().as("rentalStatus"),
                        post.title,
                        rental.createdAt))
                .from(reservation)
                .join(rental).on(reservation.id.eq(rental.reservationId))
                .join(post).on(reservation.postId.eq(post.id))
                .join(owner).on(reservation.ownerId.eq(owner.id))
                .join(renter).on(reservation.renterId.eq(renter.id))
                .where(whereCondition)
                .distinct()
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .orderBy(getOrderSpecifiers(pageable))
                .fetch();

        for (SearchRentalResult result : results) {
            List<String> imageUrls = queryFactory
                    .select(productImage.imageUrl)
                    .from(productImage)
                    .join(productImage.post, post)
                    .join(reservation).on(reservation.postId.eq(post.id))
                    .where(reservation.id.eq(result.getId()))
                    .fetch();

            result.setProductImages(imageUrls);
        }

        Long total = queryFactory
                .select(reservation.count())
                .from(reservation)
                .join(rental).on(reservation.id.eq(rental.reservationId))
                .join(post).on(reservation.postId.eq(post.id))
                .where(whereCondition)
                .fetchOne();

        return new PageImpl<>(results, pageable, total != null ? total : 0L);
    }

    @Override
    public Optional<RequestRemittanceResult> findRemittanceRequestViewData(Long rentalId) {
        return Optional.ofNullable(
                queryFactory
                        .select(Projections.constructor(
                                RequestRemittanceResult.class,
                                member.nickname.as("ownerNickname"),
                                member.profileImageUrl.as("ownerProfileImageUrl"),
                                rental.finalAmount,
                                reservation.deposit,
                                rental.accountNo,
                                rental.bankCode,
                                reservation.startDate,
                                reservation.endDate
                        ))
                        .from(reservation)
                        .join(member).on(reservation.ownerId.eq(member.id))
                        .join(rental).on(reservation.id.eq(rental.reservationId))
                        .where(reservation.rentalId.eq(rentalId))
                        .fetchOne()
        );
    }


    private OrderSpecifier<?>[] getOrderSpecifiers(Pageable pageable) {
        if (!pageable.getSort().isEmpty()) {
            List<OrderSpecifier<?>> orderSpecifiers = new ArrayList<>();

            for (Sort.Order order : pageable.getSort()) {
                Order direction = order.getDirection().isAscending() ? Order.ASC : Order.DESC;

                switch (order.getProperty()) {
                    case "createdAt":
                        orderSpecifiers.add(new OrderSpecifier<>(direction, rental.createdAt));
                        break;

                    default:
                        orderSpecifiers.add(new OrderSpecifier<>(direction, rental.createdAt));
                        break;
                }
            }

            return orderSpecifiers.toArray(new OrderSpecifier[0]);
        }

        return new OrderSpecifier[] {new OrderSpecifier<>(Order.DESC, rental.createdAt)};
    }

    private BooleanExpression rentalProcessCondition(String condition){
        if(!StringUtils.hasText(condition)){
            return null;
        }

        if (condition.contains("ACTIVE")) {
            return rental.rentalProcess.ne(RentalProcess.RENTAL_COMPLETED);
        } else if (condition.contains("COMPLETED")) {
            return rental.rentalProcess.eq(RentalProcess.RENTAL_COMPLETED);
        }

        return null;
    }

    @Override
    public ManagedRentalCountResult countManagedRentals(Long ownerId) {
        Long count = queryFactory
                .select(rental.count())
                .from(rental)
                .join(reservation).on(rental.reservationId.eq(reservation.id))
                .where(
                    reservation.ownerId.eq(ownerId),
                    rental.rentalProcess.ne(RentalProcess.RENTAL_COMPLETED)
                )
                .fetchOne();

        return ManagedRentalCountResult.builder()
                .managedRentalCount(count != null ? count : 0L)
                .build();
    }

    @Override
    public Optional<SearchRentalResult> findRentalById(Long rentalId) {
        SearchRentalResult result = queryFactory
                .select(Projections.fields(SearchRentalResult.class,
                        reservation.id.as("id"),
                        reservation.postId,
                        reservation.startDate.as("startDate"),
                        reservation.endDate.as("endDate"),
                        reservation.rentalFee,
                        reservation.deposit,
                        reservation.ownerId,
                        reservation.renterId,
                        rental.rentalId,
                        rental.rentalProcess.stringValue().as("rentalProcess"),
                        rental.rentalStatus.stringValue().as("rentalStatus"),
                        post.title,
                        rental.createdAt))
                .from(rental)
                .join(reservation).on(rental.reservationId.eq(reservation.id))
                .join(post).on(reservation.postId.eq(post.id))
                .where(rental.rentalId.eq(rentalId))
                .fetchOne();

        if (result != null) {
            List<String> imageUrls = queryFactory
                    .select(productImage.imageUrl)
                    .from(productImage)
                    .join(productImage.post, post)
                    .join(reservation).on(reservation.postId.eq(post.id))
                    .where(reservation.id.eq(result.getId()))
                    .fetch();

            result.setProductImages(imageUrls);
        }

        return Optional.ofNullable(result);
    }
}

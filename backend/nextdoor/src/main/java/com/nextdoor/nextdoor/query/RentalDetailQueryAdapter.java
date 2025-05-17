package com.nextdoor.nextdoor.query;

import com.nextdoor.nextdoor.common.Adapter;
import com.nextdoor.nextdoor.domain.member.domain.QMember;
import com.nextdoor.nextdoor.domain.post.domain.QPost;
import com.nextdoor.nextdoor.domain.post.domain.QProductImage;
import com.nextdoor.nextdoor.domain.rental.domain.QRental;
import com.nextdoor.nextdoor.domain.rental.exception.NoSuchRentalException;
import com.nextdoor.nextdoor.domain.rental.message.RentalStatusMessage;
import com.nextdoor.nextdoor.domain.rental.port.RentalDetailQueryPort;
import com.nextdoor.nextdoor.domain.reservation.domain.QReservation;
import com.nextdoor.nextdoor.domain.reservation.exception.NoSuchReservationException;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Adapter
@RequiredArgsConstructor
public class RentalDetailQueryAdapter implements RentalDetailQueryPort {

    private final JPAQueryFactory queryFactory;
    private final QRental rental = QRental.rental;
    private final QReservation reservation = QReservation.reservation;
    private final QPost post = QPost.post;
    private final QProductImage productImage = QProductImage.productImage;
    private final QMember member = QMember.member;

    public RentalStatusMessage.RentalDetailResult getRentalDetailByRentalIdAndRole(Long rentalId, String userRole) {
        Long reservationId = queryFactory
                .select(rental.reservationId)
                .from(rental)
                .where(rental.rentalId.eq(rentalId))
                .fetchOne();

        if (reservationId == null) {
            throw new NoSuchRentalException("대여 정보가 존재하지 않습니다. rentalId: " + rentalId);
        }

        Long postId = queryFactory
                .select(reservation.postId)
                .from(reservation)
                .where(reservation.id.eq(reservationId))
                .fetchOne();

        if (postId == null) {
            throw new NoSuchReservationException("예약 정보가 존재하지 않습니다. reservationId: " + reservationId);
        }

        String postTitle = queryFactory
                .select(post.title)
                .from(post)
                .where(post.id.eq(postId))
                .fetchOne();

        String representativeImageUrl = queryFactory
                .select(productImage.imageUrl)
                .from(productImage)
                .where(productImage.post.id.eq(postId))
                .fetchFirst();

        Long partnerId;
        if ("OWNER".equalsIgnoreCase(userRole)) {
            partnerId = queryFactory
                    .select(reservation.renterId)
                    .from(reservation)
                    .where(reservation.id.eq(reservationId))
                    .fetchOne();
        } else if ("RENTER".equalsIgnoreCase(userRole)) {
            partnerId = queryFactory
                    .select(reservation.ownerId)
                    .from(reservation)
                    .where(reservation.id.eq(reservationId))
                    .fetchOne();
        } else {
            throw new IllegalArgumentException("유효하지 않은 사용자 역할입니다. userRole: " + userRole);
        }

        String partnerProfileImageUrl = queryFactory
                .select(member.profileImageUrl)
                .from(member)
                .where(member.id.eq(partnerId))
                .fetchOne();

        return RentalStatusMessage.RentalDetailResult.builder()
                .postTitle(postTitle)
                .representativeImageUrl(representativeImageUrl)
                .partnerProfileImageUrl(partnerProfileImageUrl)
                .build();
    }
}

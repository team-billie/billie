package com.nextdoor.nextdoor.query;

import com.nextdoor.nextdoor.domain.member.domain.QMember;
import com.nextdoor.nextdoor.domain.post.domain.QPost;
import com.nextdoor.nextdoor.domain.post.domain.QProductImage;
import com.nextdoor.nextdoor.domain.reservation.controller.dto.request.ReservationCalendarRetrieveRequestDto;
import com.nextdoor.nextdoor.domain.reservation.controller.dto.request.ReservationRetrieveRequestDto;
import com.nextdoor.nextdoor.domain.reservation.domain.QReservation;
import com.nextdoor.nextdoor.domain.reservation.port.ReservationQueryPort;
import com.nextdoor.nextdoor.domain.reservation.service.dto.ReservationCalendarQueryDto;
import com.nextdoor.nextdoor.domain.reservation.service.dto.ReservationQueryDto;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.group.GroupBy;
import com.querydsl.core.types.ConstructorExpression;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Repository
public class ReservationQueryAdapter implements ReservationQueryPort {

    private final JPAQueryFactory jpaQueryFactory;
    private final QReservation qReservation = QReservation.reservation;
    private final QPost qPost = QPost.post;
    private final QMember owner = new QMember("owner");
    private final QMember renter = new QMember("renter");
    private final QProductImage qProductImage = QProductImage.productImage;

    @Override
    public Optional<ReservationQueryDto> findById(Long reservationId) {
        return Optional.ofNullable(
                jpaQueryFactory.select(createReservationQueryDtoProjection())
                        .from(qReservation)
                        .join(qPost).on(qReservation.postId.eq(qPost.id)).fetchJoin()
                        .join(owner).on(qReservation.ownerId.eq(owner.id)).fetchJoin()
                        .join(renter).on(qReservation.renterId.eq(renter.id)).fetchJoin()
                        .where(qReservation.id.eq(reservationId))
                        .fetchOne());
    }

    @Override
    public List<ReservationQueryDto> findSentReservations(Long loginUserId, ReservationRetrieveRequestDto requestDto) {
        return jpaQueryFactory.select(createReservationQueryDtoProjection())
                .from(qReservation)
                .join(qPost).on(qReservation.postId.eq(qPost.id)).fetchJoin()
                .join(owner).on(qReservation.ownerId.eq(owner.id)).fetchJoin()
                .join(renter).on(qReservation.renterId.eq(renter.id)).fetchJoin()
                .where(createSentReservationCondition(loginUserId, requestDto))
                .fetch();
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
        return jpaQueryFactory.select(createReservationQueryDtoProjection())
                .from(qReservation)
                .join(qPost).on(qReservation.postId.eq(qPost.id)).fetchJoin()
                .join(owner).on(qReservation.ownerId.eq(owner.id)).fetchJoin()
                .join(renter).on(qReservation.renterId.eq(renter.id)).fetchJoin()
                .where(createReceivedReservationCondition(loginUserId, requestDto))
                .fetch();
    }

    private BooleanBuilder createReceivedReservationCondition(Long loginUserId, ReservationRetrieveRequestDto requestDto) {
        BooleanBuilder builder = new BooleanBuilder().and(qReservation.ownerId.eq(loginUserId));
        if (requestDto.getStatus() != null) {
            builder.and(qReservation.status.eq(requestDto.getStatus()));
        }
        return builder;
    }

    @Override
    public List<ReservationCalendarQueryDto> findReservationCalendar(ReservationCalendarRetrieveRequestDto requestDto) {
        return jpaQueryFactory.select(createReservationCalendarQueryDtoProjection())
                .from(qReservation)
                .where(createReservationCalendarCondition(requestDto))
                .fetch();
    }

    private BooleanBuilder createReservationCalendarCondition(ReservationCalendarRetrieveRequestDto requestDto) {
        LocalDate firstDayOfMonth = LocalDate.of(requestDto.getYear(), requestDto.getMonth(), 1);
        LocalDate lastDayOfMonth = firstDayOfMonth.withDayOfMonth(firstDayOfMonth.lengthOfMonth());
        return new BooleanBuilder()
                .and(qReservation.startDate.between(firstDayOfMonth, lastDayOfMonth))
                .and(qReservation.endDate.between(firstDayOfMonth, lastDayOfMonth));
    }

    private ConstructorExpression<ReservationQueryDto> createReservationQueryDtoProjection() {
        return Projections.constructor(
                ReservationQueryDto.class,
                qReservation.id,
                qReservation.startDate,
                qReservation.endDate,
                qReservation.rentalFee,
                qReservation.deposit,
                qReservation.status.stringValue(),
                qReservation.rentalId,
                qReservation.ownerId,
                owner.nickname,
                owner.profileImageUrl,
                qReservation.renterId,
                renter.nickname,
                renter.profileImageUrl,
                qReservation.postId,
                qPost.title,
                jpaQueryFactory
                        .select(qProductImage.imageUrl.min())
                        .from(qProductImage)
                        .where(qProductImage.post.id.eq(qPost.id))
        );
    }

    private ConstructorExpression<ReservationCalendarQueryDto> createReservationCalendarQueryDtoProjection() {
        return Projections.constructor(
                ReservationCalendarQueryDto.class,
                qReservation.startDate,
                qReservation.endDate
        );
    }
}

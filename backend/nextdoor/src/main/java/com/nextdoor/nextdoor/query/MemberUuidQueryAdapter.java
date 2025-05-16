package com.nextdoor.nextdoor.query;

import com.nextdoor.nextdoor.common.Adapter;
import com.nextdoor.nextdoor.domain.member.domain.QMember;
import com.nextdoor.nextdoor.domain.rental.domain.QRental;
import com.nextdoor.nextdoor.domain.rental.exception.NoSuchRentalException;
import com.nextdoor.nextdoor.domain.rental.port.MemberUuidQueryPort;
import com.nextdoor.nextdoor.domain.reservation.domain.QReservation;
import com.nextdoor.nextdoor.domain.reservation.exception.NoSuchReservationException;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Adapter
@RequiredArgsConstructor
public class MemberUuidQueryAdapter implements MemberUuidQueryPort {

    private final JPAQueryFactory queryFactory;
    private final QRental rental = QRental.rental;
    private final QReservation reservation = QReservation.reservation;
    private final QMember member = QMember.member;

    @Override
    public String getMemberUuidByRentalIdAndRole(Long rentalId, String userRole) {
        Long reservationId = queryFactory
                .select(rental.reservationId)
                .from(rental)
                .where(rental.rentalId.eq(rentalId))
                .fetchOne();

        if (reservationId == null) {
            throw new NoSuchRentalException("대여 정보가 존재하지 않습니다. rentalId: " + rentalId);
        }

        Long memberId;
        if ("OWNER".equalsIgnoreCase(userRole)) {
            memberId = queryFactory
                    .select(reservation.ownerId)
                    .from(reservation)
                    .where(reservation.id.eq(reservationId))
                    .fetchOne();
        } else if ("RENTER".equalsIgnoreCase(userRole)) {
            memberId = queryFactory
                    .select(reservation.renterId)
                    .from(reservation)
                    .where(reservation.id.eq(reservationId))
                    .fetchOne();
        } else {
            throw new IllegalArgumentException("유효하지 않은 사용자 역할입니다. userRole: " + userRole);
        }

        if (memberId == null) {
            throw new NoSuchReservationException("예약 정보가 존재하지 않습니다. reservationId: " + reservationId);
        }
        String uuid = queryFactory
                .select(member.uuid)
                .from(member)
                .where(member.id.eq(memberId))
                .fetchOne();

        if (uuid == null) {
            throw new IllegalStateException("회원 정보가 존재하지 않습니다. memberId: " + memberId);
        }

        return uuid;
    }
}
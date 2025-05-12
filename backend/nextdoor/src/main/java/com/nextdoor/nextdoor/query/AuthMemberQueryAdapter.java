package com.nextdoor.nextdoor.query;

import com.nextdoor.nextdoor.common.Adapter;
import com.nextdoor.nextdoor.domain.auth.port.AuthMemberQueryPort;
import com.nextdoor.nextdoor.domain.auth.service.dto.MemberQueryDto;
import com.nextdoor.nextdoor.domain.member.domain.QMember;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import java.util.Optional;

@RequiredArgsConstructor
@Adapter
public class AuthMemberQueryAdapter implements AuthMemberQueryPort {

    private final JPAQueryFactory jpaQueryFactory;

    private final QMember qMember = QMember.member;

    @Override
    public Optional<MemberQueryDto> findByEmail(String email) {
        return Optional.ofNullable(jpaQueryFactory.select(Projections.constructor(
                        MemberQueryDto.class,
                        qMember.id,
                        qMember.email
                ))
                .from(qMember)
                .where(qMember.email.eq(email))
                .fetchOne());
    }
}

package com.nextdoor.nextdoor.query;

import com.nextdoor.nextdoor.common.Adapter;
import com.nextdoor.nextdoor.domain.auth.AuthMemberQueryPort;
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
    public Optional<MemberQueryDto> findByNickname(String nickname) {
        return Optional.ofNullable(jpaQueryFactory.select(Projections.constructor(
                        MemberQueryDto.class,
                        qMember.id,
                        qMember.nickname
                ))
                .from(qMember)
                .where(qMember.nickname.eq(nickname))
                .fetchOne());
    }
}

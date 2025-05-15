package com.nextdoor.nextdoor.query;

import com.nextdoor.nextdoor.common.Adapter;
import com.nextdoor.nextdoor.domain.fintech.port.FintechMemberQueryPort;
import com.nextdoor.nextdoor.domain.member.domain.QMember;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import java.util.Optional;

@RequiredArgsConstructor
@Adapter
public class FintechMemberQueryAdapter implements FintechMemberQueryPort {

    private final JPAQueryFactory jpaQueryFactory;
    private final QMember qMember = QMember.member;

    @Override
    public Optional<String> findNicknameById(Long memberId) {
        return Optional.ofNullable(
                jpaQueryFactory
                        .select(qMember.nickname)
                        .from(qMember)
                        .where(qMember.id.eq(memberId))
                        .fetchOne()
        );
    }
}
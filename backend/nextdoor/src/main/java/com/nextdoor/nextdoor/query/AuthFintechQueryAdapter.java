package com.nextdoor.nextdoor.query;

import com.nextdoor.nextdoor.common.Adapter;
import com.nextdoor.nextdoor.domain.auth.port.AuthFintechQueryPort;
import com.nextdoor.nextdoor.domain.auth.service.dto.AuthFintechQueryDto;
import com.nextdoor.nextdoor.domain.fintech.domain.QFintechUser;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Adapter
public class AuthFintechQueryAdapter implements AuthFintechQueryPort {

    private final JPAQueryFactory jpaQueryFactory;
    private final QFintechUser qFintechUser = QFintechUser.fintechUser;

    @Override
    public AuthFintechQueryDto findByUserId(Long userId) {
        return jpaQueryFactory.select(Projections.constructor(
                        AuthFintechQueryDto.class,
                        qFintechUser.userKey
                ))
                .from(qFintechUser)
                .where(qFintechUser.userId.eq(userId))
                .fetchOne();
    }
}

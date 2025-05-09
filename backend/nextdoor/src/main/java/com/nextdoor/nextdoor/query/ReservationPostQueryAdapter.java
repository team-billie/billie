package com.nextdoor.nextdoor.query;

import com.nextdoor.nextdoor.common.Adapter;
import com.nextdoor.nextdoor.domain.post.domain.QPost;
import com.nextdoor.nextdoor.domain.reservation.port.ReservationPostQueryPort;
import com.nextdoor.nextdoor.domain.reservation.service.dto.PostDto;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.StringExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import java.math.BigDecimal;
import java.util.Optional;

@RequiredArgsConstructor
@Adapter
public class ReservationPostQueryAdapter implements ReservationPostQueryPort {

    private final JPAQueryFactory jpaQueryFactory;
    private final QPost qPost = QPost.post;
    // TODO qMember 추가하기

    @Override
    public Optional<PostDto> findById(Long postId) {
        // TODO Member 추가 후 필드에 사용자 정보 할당하기
        return Optional.ofNullable(
                jpaQueryFactory.select(Projections.constructor(
                                PostDto.class,
                                qPost.postId,
                                qPost.title,
                                qPost.content,
                                qPost.rentalFee.castToNum(BigDecimal.class),
                                qPost.deposit.castToNum(BigDecimal.class),
                                qPost.productImage,
                                qPost.category,
                                qPost.authorId,
                                qPost.title,
                                qPost.title))
                        .from(qPost)
                        .where(qPost.postId.eq(postId))
                        .fetchOne()
        );
    }
}

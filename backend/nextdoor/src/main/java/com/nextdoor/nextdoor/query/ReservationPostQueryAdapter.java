package com.nextdoor.nextdoor.query;

import com.nextdoor.nextdoor.common.Adapter;
import com.nextdoor.nextdoor.domain.member.domain.QMember;
import com.nextdoor.nextdoor.domain.post.domain.QPost;
import com.nextdoor.nextdoor.domain.post.domain.QProductImage;
import com.nextdoor.nextdoor.domain.reservation.port.ReservationPostQueryPort;
import com.nextdoor.nextdoor.domain.reservation.service.dto.PostDto;
import com.querydsl.core.types.ConstructorExpression;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import java.math.BigDecimal;
import java.util.Optional;

@RequiredArgsConstructor
@Adapter
public class ReservationPostQueryAdapter implements ReservationPostQueryPort {

    private final JPAQueryFactory jpaQueryFactory;
    private final QPost qPost = QPost.post;
    private final QMember qMember = QMember.member;
    private final QProductImage qProductImage = QProductImage.productImage;

    @Override
    public Optional<PostDto> findById(Long postId) {
        return Optional.ofNullable(jpaQueryFactory.select(createReservationQueryDtoProjection())
                .from(qPost)
                .join(qMember).on(qPost.authorId.eq(qMember.id)).fetchJoin()
                .where(qPost.id.eq(postId))
                .fetchOne());
    }

    private ConstructorExpression<PostDto> createReservationQueryDtoProjection() {
        return Projections.constructor(
                PostDto.class,
                qPost.id,
                qPost.title,
                qPost.content,
                qPost.rentalFee.castToNum(BigDecimal.class),
                qPost.deposit.castToNum(BigDecimal.class),
                jpaQueryFactory
                        .select(qProductImage.imageUrl.min())
                        .from(qProductImage)
                        .where(qProductImage.post.id.eq(qPost.id)),
                qPost.category.stringValue(),
                qPost.authorId,
                qMember.uuid,
                qMember.nickname,
                qMember.profileImageUrl
        );
    }
}

package com.nextdoor.nextdoor.query;

import com.nextdoor.nextdoor.common.Adapter;
import com.nextdoor.nextdoor.domain.member.domain.QMember;
import com.nextdoor.nextdoor.domain.post.domain.QPost;
import com.nextdoor.nextdoor.domain.post.domain.QProductImage;
import com.nextdoor.nextdoor.domain.reservation.port.ReservationPostQueryPort;
import com.nextdoor.nextdoor.domain.reservation.service.dto.PostDto;
import com.querydsl.core.group.GroupBy;
import com.querydsl.core.types.ConstructorExpression;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import java.math.BigDecimal;
import java.util.Collections;
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
        Optional<PostDto> optionalPostDto = Optional.ofNullable(jpaQueryFactory.select(createReservationQueryDtoProjection())
                .from(qPost)
                .join(qMember).on(qPost.authorId.eq(qMember.id)).fetchJoin()
                .where(qPost.id.eq(postId))
                .fetchOne());
        optionalPostDto.ifPresent(postDto ->
                postDto.setProductImages(jpaQueryFactory.select(qProductImage.imageUrl)
                        .from(qProductImage)
                        .where(qProductImage.post.id.eq(postDto.getPostId()))
                        .fetch()));
        return optionalPostDto;
    }

    private ConstructorExpression<PostDto> createReservationQueryDtoProjection() {
        return Projections.constructor(
                PostDto.class,
                qPost.id,
                qPost.title,
                qPost.content,
                qPost.rentalFee.castToNum(BigDecimal.class),
                qPost.deposit.castToNum(BigDecimal.class),
                Expressions.constant(Collections.emptyList()),
                qPost.category.stringValue(),
                qPost.authorId,
                qMember.name,
                qMember.profileImageUrl
        );
    }
}

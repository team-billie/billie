package com.nextdoor.nextdoor.query;

import com.nextdoor.nextdoor.common.Adapter;
import com.nextdoor.nextdoor.domain.member.domain.QMember;
import com.nextdoor.nextdoor.domain.post.domain.Post;
import com.nextdoor.nextdoor.domain.post.domain.QPost;
import com.nextdoor.nextdoor.domain.post.domain.QPostLike;
import com.nextdoor.nextdoor.domain.post.domain.QProductImage;
import com.nextdoor.nextdoor.domain.post.port.PostQueryPort;
import com.nextdoor.nextdoor.domain.post.service.dto.PostDetailResult;
import com.nextdoor.nextdoor.domain.post.service.dto.SearchPostCommand;
import com.nextdoor.nextdoor.domain.post.service.dto.SearchPostResult;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.NumberExpression;
import com.querydsl.jpa.JPQLQuery;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import java.util.List;

@Adapter
@RequiredArgsConstructor
public class PostQueryAdapter implements PostQueryPort {

    private final JPAQueryFactory queryFactory;
    private final QPost post = QPost.post;
    private final QMember member = QMember.member;
    private final QProductImage productImage = QProductImage.productImage;
    private final QPostLike postLike = QPostLike.postLike;

    @Override
    public Page<SearchPostResult> searchPostsByMemberAddress(SearchPostCommand command) {
        JPAQuery<SearchPostResult> query = queryFactory
                .select(Projections.constructor(
                        SearchPostResult.class,
                        post.title,
                        post.content,
                        post.rentalFee,
                        post.deposit,
                        post.address,
                        getFirstProductImageQuery(post.id),
                        post.category.stringValue(),
                        post.authorId,
                        member.nickname,
                        getLikeCountQuery(post.id),
                        post.createdAt
                ))
                .from(post)
                .join(member).on(post.authorId.eq(member.id));

        long total = query.fetchCount();

        Pageable pageable = command.getPageable();
        List<SearchPostResult> results = query
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        return new PageImpl<>(results, pageable, total);
    }

    private JPQLQuery<String> getFirstProductImageQuery(NumberExpression<Long> postId) {
        return queryFactory
                .select(productImage.imageUrl)
                .from(productImage)
                .where(productImage.post.id.eq(postId))
                .orderBy(productImage.id.asc())
                .limit(1);
    }

    private JPQLQuery<Integer> getLikeCountQuery(NumberExpression<Long> postId) {
        return queryFactory
                .select(postLike.count().intValue())
                .from(postLike)
                .where(postLike.post.id.eq(postId));
    }

    @Override
    public PostDetailResult getPostDetail(Long postId) {
        Post postEntity = queryFactory
                .selectFrom(post)
                .where(post.id.eq(postId))
                .fetchOne();

        if(postEntity == null){
            return null;
        }

        String nickname = queryFactory
                .select(member.nickname)
                .from(member)
                .where(member.id.eq(postEntity.getAuthorId()))
                .fetchOne();

        List<String> productImages = queryFactory
                .select(productImage.imageUrl)
                .from(productImage)
                .where(productImage.post.id.eq(postId))
                .fetch();

        return PostDetailResult.builder()
                .title(postEntity.getTitle())
                .content(postEntity.getContent())
                .rentalFee(postEntity.getRentalFee())
                .deposit(postEntity.getDeposit())
                .address(postEntity.getAddress())
                .location(postEntity.getLocation())
                .productImages(productImages)
                .category(postEntity.getCategory().toString())
                .nickname(nickname)
                .build();
    }
}

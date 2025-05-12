package com.nextdoor.nextdoor.query;

import com.nextdoor.nextdoor.common.Adapter;
import com.nextdoor.nextdoor.domain.member.domain.QMember;
import com.nextdoor.nextdoor.domain.post.domain.Post;
import com.nextdoor.nextdoor.domain.post.domain.QPost;
import com.nextdoor.nextdoor.domain.post.domain.QPostLike;
import com.nextdoor.nextdoor.domain.post.domain.QProductImage;
import com.nextdoor.nextdoor.domain.post.port.PostQueryPort;
import com.nextdoor.nextdoor.domain.post.service.dto.PostDetailResult;
import com.nextdoor.nextdoor.domain.post.service.dto.LocationDto;
import com.nextdoor.nextdoor.domain.post.service.dto.SearchPostCommand;
import com.nextdoor.nextdoor.domain.post.service.dto.SearchPostResult;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

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
        Long userId = command.getUserId();
        String userAddress = queryFactory
                .select(member.address)
                .from(member)
                .where(member.id.eq(userId))
                .fetchOne();

        JPAQuery<SearchPostResult> query = queryFactory
                .select(Projections.constructor(
                        SearchPostResult.class,
                        post.id,
                        post.title,
                        queryFactory
                                .select(productImage.imageUrl.min())
                                .from(productImage)
                                .where(productImage.post.id.eq(post.id)),
                        post.rentalFee,
                        post.deposit,
                        postLike.count().intValue(),
                        Expressions.constant(0)
                ))
                .from(post)
                .join(member).on(post.authorId.eq(member.id))
                .leftJoin(postLike).on(postLike.post.id.eq(post.id))
                .where(post.address.eq(userAddress))
                .groupBy(post.id);

        long total = query.fetchCount();

        Pageable pageable = command.getPageable();
        List<SearchPostResult> results = query
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        return new PageImpl<>(results, pageable, total);
    }

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

        String locationStr = queryFactory
                .select(Expressions.stringTemplate("ST_AsText({0})", post.location))
                .from(post)
                .where(post.id.eq(postId))
                .fetchOne();

        LocationDto locationDto = parseLocationPoint(locationStr);

        return PostDetailResult.builder()
                .title(postEntity.getTitle())
                .content(postEntity.getContent())
                .rentalFee(Math.toIntExact(postEntity.getRentalFee()))
                .deposit(Math.toIntExact(postEntity.getDeposit()))
                .address(postEntity.getAddress())
                .location(locationDto)
                .productImages(productImages)
                .category(postEntity.getCategory().toString())
                .authorId(postEntity.getAuthorId())
                .nickname(nickname)
                .build();
    }

    private LocationDto parseLocationPoint(String pointStr) {
        if (pointStr == null || pointStr.isEmpty()) {
            return null;
        }

        Pattern pattern = Pattern.compile("POINT\\((\\S+)\\s+(\\S+)\\)");
        Matcher matcher = pattern.matcher(pointStr);

        if (matcher.find()) {
            try {
                double latitude = Double.parseDouble(matcher.group(1));
                double longitude = Double.parseDouble(matcher.group(2));
                return new LocationDto(latitude, longitude);
            } catch (NumberFormatException e) {
                return null;
            }
        }

        return null;
    }
}
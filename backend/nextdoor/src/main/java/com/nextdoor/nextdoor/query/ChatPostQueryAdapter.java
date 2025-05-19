//package com.nextdoor.nextdoor.query;
//
//import com.nextdoor.nextdoor.common.Adapter;
//import com.nextdoor.nextdoor.domain.chat.application.dto.PostDto;
//import com.nextdoor.nextdoor.domain.chat.port.ChatPostQueryPort;
//import com.nextdoor.nextdoor.domain.post.domain.QPost;
//import com.nextdoor.nextdoor.domain.post.domain.QProductImage;
//import com.querydsl.core.types.Projections;
//import com.querydsl.jpa.impl.JPAQueryFactory;
//import lombok.RequiredArgsConstructor;
//
//import java.util.Optional;
//
//@RequiredArgsConstructor
//@Adapter
//public class ChatPostQueryAdapter implements ChatPostQueryPort {
//
//    private final JPAQueryFactory jpaQueryFactory;
//    private final QPost qPost = QPost.post;
//    private final QProductImage qProductImage = QProductImage.productImage;
//
//    @Override
//    public Optional<PostDto> findById(Long postId) {
//        // First get the post
//        Optional<PostDto> postDto = Optional.ofNullable(jpaQueryFactory.select(
//                Projections.constructor(
//                    PostDto.class,
//                    qPost.id,
//                    qPost.title,
//                    qProductImage.imageUrl,
//                    qPost.rentalFee,
//                    qPost.deposit
//                ))
//                .from(qPost)
//                .leftJoin(qProductImage).on(qPost.id.eq(qProductImage.post.id))
//                .where(qPost.id.eq(postId))
//                .fetchFirst());
//
//        return postDto;
//    }
//}
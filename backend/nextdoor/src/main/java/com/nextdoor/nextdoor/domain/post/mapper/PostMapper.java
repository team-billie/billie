package com.nextdoor.nextdoor.domain.post.mapper;

import com.nextdoor.nextdoor.domain.post.controller.dto.request.CreatePostRequest;
import com.nextdoor.nextdoor.domain.post.controller.dto.response.CreatePostResponse;
import com.nextdoor.nextdoor.domain.post.controller.dto.response.PostDetailResponse;
import com.nextdoor.nextdoor.domain.post.controller.dto.response.PostListResponse;
import com.nextdoor.nextdoor.domain.post.domain.Post;
import com.nextdoor.nextdoor.domain.post.service.dto.CreatePostCommand;
import com.nextdoor.nextdoor.domain.post.service.dto.CreatePostResult;
import com.nextdoor.nextdoor.domain.post.service.dto.PostDetailResult;
import com.nextdoor.nextdoor.domain.post.service.dto.SearchPostCommand;
import com.nextdoor.nextdoor.domain.post.service.dto.SearchPostResult;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Component
@RequiredArgsConstructor
public class PostMapper {

    public SearchPostCommand toCommand(Long userId, Pageable pageable) {
        return SearchPostCommand.builder()
                .userId(userId)
                .pageable(pageable)
                .build();
    }

    public PostListResponse toResponse(SearchPostResult result) {
        return PostListResponse.builder()
                .postId(result.getPostId())
                .title(result.getTitle())
                .productImage(result.getProductImage())
                .rentalFee(String.valueOf(result.getRentalFee()))
                .deposit(String.valueOf(result.getDeposit()))
                .like(result.getLikeCount())
                .dealCount(result.getDealCount())
                .build();
    }

    public PostDetailResponse toDetailResponse(PostDetailResult result) {

        return PostDetailResponse.builder()
                .title(result.getTitle())
                .content(result.getContent())
                .rentalFee((long) result.getRentalFee())
                .deposit((long) result.getDeposit())
                .address(result.getAddress())
                .location(result.getLocation())
                .productImage(result.getProductImages())
                .category(result.getCategory())
                .authorId(result.getAuthorId())
                .nickname(result.getNickname())
                .build();
    }

    public CreatePostCommand toCreateCommand(CreatePostRequest request, List<MultipartFile> productImages, Long authorId) {
        return CreatePostCommand.builder()
                .title(request.getTitle())
                .content(request.getContent())
                .category(request.getCategory())
                .rentalFee(request.getRentalFee().longValue())
                .deposit(request.getDeposit().longValue())
                .preferredLocation(request.getPreferredLocation())
                .authorId(authorId)
                .productImages(productImages)
                .build();
    }

    public CreatePostResponse toCreateResponse(CreatePostResult result) {
        return CreatePostResponse.builder()
                .id(result.getId())
                .title(result.getTitle())
                .content(result.getContent())
                .category(result.getCategory().name())
                .rentalFee(String.valueOf(result.getRentalFee()))
                .deposit(String.valueOf(result.getDeposit()))
                .preferredLocation(result.getPreferredLocation())
                .authorId(result.getAuthorId())
                .productImageUrls(result.getProductImageUrls())
                .build();
    }

    public CreatePostResult toCreateResult(Post post, List<String> imageUrls) {
        return CreatePostResult.builder()
                .id(post.getId())
                .title(post.getTitle())
                .content(post.getContent())
                .category(post.getCategory())
                .rentalFee(post.getRentalFee())
                .deposit(post.getDeposit())
                .preferredLocation(post.getAddress())
                .authorId(post.getAuthorId())
                .productImageUrls(imageUrls)
                .build();
    }
}

package com.nextdoor.nextdoor.domain.post.mapper;

import com.nextdoor.nextdoor.domain.post.controller.dto.response.PostListResponse;
import com.nextdoor.nextdoor.domain.post.service.dto.SearchPostCommand;
import com.nextdoor.nextdoor.domain.post.service.dto.SearchPostResult;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;

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
                .title(result.getTitle())
                .productImage(result.getProductImage())
                .rentalFee(String.valueOf(result.getRentalFee()))
                .deposit(String.valueOf(result.getDeposit()))
                .like(result.getLikeCount())
                .dealCount(result.getDealCount())
                .build();
    }
}
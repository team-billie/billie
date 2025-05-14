package com.nextdoor.nextdoor.domain.post.controller.dto;

import com.nextdoor.nextdoor.domain.post.search.PostDocument;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PostSearchResponseDto {
    private Long id;
    private String title;
    private String content;
    private Long rentalFee;
    private Long deposit;
    private String address;
    private String category;
    private Long authorId;
    private Integer likeCount;
    private Instant createdAt;
    
    public static PostSearchResponseDto from(PostDocument document) {
        return PostSearchResponseDto.builder()
            .id(document.getId())
            .title(document.getTitle())
            .content(document.getContent())
            .rentalFee(document.getRentalFee())
            .deposit(document.getDeposit())
            .address(document.getAddress())
            .category(document.getCategory())
            .authorId(document.getAuthorId())
            .likeCount(document.getLikeCount())
            .createdAt(document.getCreatedAt())
            .build();
    }
}
package com.nextdoor.nextdoor.domain.chat.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO for post information needed by the chat domain
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PostDto {
    /** Post ID */
    private Long id;

    /** Post title */
    private String title;

    /** Post image URL */
    private String imageUrl;

    /** 대여료 */
    private Long rentalFee;

    /** 보증금 */
    private Long deposit;
}
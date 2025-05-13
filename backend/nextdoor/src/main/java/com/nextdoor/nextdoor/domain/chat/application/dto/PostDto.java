package com.nextdoor.nextdoor.domain.chat.application.dto;

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
}
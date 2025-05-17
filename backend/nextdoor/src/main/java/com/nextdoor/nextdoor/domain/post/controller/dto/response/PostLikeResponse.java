package com.nextdoor.nextdoor.domain.post.controller.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * Response DTO for post like operations
 */
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PostLikeResponse {
    private Long postId;
    private boolean liked;
    private int likeCount;
    
    /**
     * Creates a response for a like operation
     * @param postId The ID of the post
     * @param liked Whether the post is liked by the user
     * @param likeCount The number of likes for the post
     * @return A PostLikeResponse
     */
    public static PostLikeResponse of(Long postId, boolean liked, int likeCount) {
        return PostLikeResponse.builder()
                .postId(postId)
                .liked(liked)
                .likeCount(likeCount)
                .build();
    }
}
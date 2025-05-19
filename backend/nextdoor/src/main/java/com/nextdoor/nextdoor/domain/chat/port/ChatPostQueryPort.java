package com.nextdoor.nextdoor.domain.chat.port;


import com.nextdoor.nextdoor.domain.chat.dto.PostDto;

import java.util.Optional;

/**
 * Chat domain's port for querying post information
 */
public interface ChatPostQueryPort {

    /**
     * Find post information by ID
     * @param postId the ID of the post to find
     * @return Optional containing post information if found
     */
    Optional<PostDto> findById(Long postId);
}

package com.nextdoor.nextdoor.domain.post.service;

import com.nextdoor.nextdoor.domain.post.service.dto.PostDetailResult;
import com.nextdoor.nextdoor.domain.post.service.dto.SearchPostCommand;
import com.nextdoor.nextdoor.domain.post.service.dto.SearchPostResult;
import org.springframework.data.domain.Page;

public interface PostService {

    /**
     * Search posts by user address
     * @param command search parameters including userId and pagination
     * @return page of posts filtered by user address
     */
    Page<SearchPostResult> searchPostsByUserAddress(SearchPostCommand command);

    /**
     * Get post detail by post id
     * @param postId the id of the post to retrieve
     * @return post detail with author nickname
     */
    PostDetailResult getPostDetail(Long postId);
}

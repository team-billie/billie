package com.nextdoor.nextdoor.domain.post.port;

import com.nextdoor.nextdoor.domain.post.service.dto.PostDetailResult;
import com.nextdoor.nextdoor.domain.post.service.dto.SearchPostCommand;
import com.nextdoor.nextdoor.domain.post.service.dto.SearchPostResult;
import org.springframework.data.domain.Page;

public interface PostQueryPort {

    Page<SearchPostResult> searchPostsByUserAddress(SearchPostCommand command);
    PostDetailResult getPostDetail(Long postId);
}

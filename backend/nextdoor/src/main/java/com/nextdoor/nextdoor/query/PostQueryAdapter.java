package com.nextdoor.nextdoor.query;

import com.nextdoor.nextdoor.common.Adapter;
import com.nextdoor.nextdoor.domain.post.port.PostQueryPort;
import com.nextdoor.nextdoor.domain.post.service.dto.SearchPostCommand;
import com.nextdoor.nextdoor.domain.post.service.dto.SearchPostResult;
import org.springframework.data.domain.Page;

@Adapter
public class PostQueryAdapter implements PostQueryPort {

    @Override
    public Page<SearchPostResult> searchPostsByUserAddress(SearchPostCommand command) {
        return null;
    }
}

package com.nextdoor.nextdoor.domain.post.listener;

import com.nextdoor.nextdoor.domain.post.event.PostCreatedEvent;
import com.nextdoor.nextdoor.domain.post.event.PostUpdatedEvent;
import com.nextdoor.nextdoor.domain.post.search.PostIndexService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class PostIndexEventListener {

    private final PostIndexService postIndexService;

    public void onPostCreated(PostCreatedEvent postCreatedEvent) {
        postIndexService.indexSinglePost(postCreatedEvent.getPostId());
    }

    public void onPostDeleted(PostUpdatedEvent postUpdatedEvent) {
        postIndexService.deleteSingleIndex(postUpdatedEvent.getPostId());
    }
}

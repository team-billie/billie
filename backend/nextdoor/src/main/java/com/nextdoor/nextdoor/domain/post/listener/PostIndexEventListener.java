package com.nextdoor.nextdoor.domain.post.listener;

import com.nextdoor.nextdoor.domain.post.event.PostCreatedEvent;
import com.nextdoor.nextdoor.domain.post.event.PostUpdatedEvent;
import com.nextdoor.nextdoor.domain.post.search.PostIndexService;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;
import org.springframework.transaction.event.TransactionPhase;
import org.springframework.transaction.event.TransactionalEventListener;

@Component
@RequiredArgsConstructor
public class PostIndexEventListener {

    private final PostIndexService postIndexService;

    @Async("asyncExecutor")
    @TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)
    public void onPostCreated(PostCreatedEvent postCreatedEvent) {
        postIndexService.indexSinglePost(postCreatedEvent.getPostId());
    }

    @Async("asyncExecutor")
    @TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)
    public void onPostDeleted(PostUpdatedEvent postUpdatedEvent) {
        postIndexService.deleteSingleIndex(postUpdatedEvent.getPostId());
    }
}

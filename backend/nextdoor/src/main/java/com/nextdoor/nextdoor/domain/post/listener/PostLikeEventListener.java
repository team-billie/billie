package com.nextdoor.nextdoor.domain.post.listener;

import com.nextdoor.nextdoor.domain.post.domain.PostLikeCount;
import com.nextdoor.nextdoor.domain.post.event.PostLikedEvent;
import com.nextdoor.nextdoor.domain.post.event.PostUnlikedEvent;
import com.nextdoor.nextdoor.domain.post.repository.PostLikeCountRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.event.TransactionalEventListener;

@Component
@RequiredArgsConstructor
public class PostLikeEventListener {

    private final PostLikeCountRepository postLikeCountRepository;
    
    @Async
    @TransactionalEventListener
    public void handlePostLikedEvent(PostLikedEvent event) {
        updateLikeCount(event.getPostId(), true);
    }
    
    @Async
    @TransactionalEventListener
    public void handlePostUnlikedEvent(PostUnlikedEvent event) {
        updateLikeCount(event.getPostId(), false);
    }
    
    @Transactional
    public void updateLikeCount(Long postId, boolean increase) {
        PostLikeCount likeCount = postLikeCountRepository.findById(postId)
                .orElseGet(() -> new PostLikeCount(postId, 0L));
        
        if (increase) {
            likeCount.increaseLikeCount();
        } else {
            likeCount.decreaseLikeCount();
        }
        
        postLikeCountRepository.save(likeCount);
    }
}
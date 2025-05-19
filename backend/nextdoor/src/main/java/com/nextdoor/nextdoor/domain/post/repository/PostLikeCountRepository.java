package com.nextdoor.nextdoor.domain.post.repository;

import com.nextdoor.nextdoor.domain.post.domain.PostLikeCount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PostLikeCountRepository extends JpaRepository<PostLikeCount, Long> {
    // The primary key of PostLikeCount is postId, so we can use findById to find by postId
}
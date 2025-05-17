package com.nextdoor.nextdoor.domain.post.repository;

import com.nextdoor.nextdoor.domain.post.domain.Post;
import com.nextdoor.nextdoor.domain.post.domain.PostLike;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PostLikeRepository extends JpaRepository<PostLike, Long> {
    Optional<PostLike> findByPostAndMemberId(Post post, Long memberId);
    void deleteByPostAndMemberId(Post post, Long memberId);
    boolean existsByPostAndMemberId(Post post, Long memberId);
    int countByPost(Post post);
}
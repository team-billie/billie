package com.nextdoor.nextdoor.domain.post.event;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class PostLikedEvent {

    private final Long postId;
}
package com.nextdoor.nextdoor.domain.post.event;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class PostUnlikedEvent {

    private final Long postId;
}
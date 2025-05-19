package com.nextdoor.nextdoor.domain.post.event;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class PostCreatedEvent {

    private Long postId;
}

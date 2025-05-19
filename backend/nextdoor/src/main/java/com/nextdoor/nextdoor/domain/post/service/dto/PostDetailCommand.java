package com.nextdoor.nextdoor.domain.post.service.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class PostDetailCommand {

    private Long postId;
    private Long userId;
}

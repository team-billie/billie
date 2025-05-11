package com.nextdoor.nextdoor.domain.post.service.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.domain.Pageable;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SearchPostCommand {

    private Long userId;
    private Pageable pageable;
}
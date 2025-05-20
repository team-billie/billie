package com.nextdoor.nextdoor.domain.post.controller.dto.response;

import com.nextdoor.nextdoor.domain.post.domain.Category;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AnalyzeProductImageResponse {
    private String title;
    private String content;
    private Category category;
    private String condition;
}

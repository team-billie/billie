package com.nextdoor.nextdoor.domain.post.service.dto;

import com.nextdoor.nextdoor.domain.post.domain.Category;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ImageAnalysisResult {
    private String suggestedTitle;
    private String suggestedContent;
    private Category suggestedCategory;
}
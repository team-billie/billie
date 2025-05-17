package com.nextdoor.nextdoor.domain.post.service.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ImageAnalysisCommand {
    private MultipartFile productImage;
    private Long userId;
}
package com.nextdoor.nextdoor.domain.s3store.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FileUploadResponseDto {
    private Long id;
    private String fileName;
    private String originalFileName;
    private String fileUrl;
    private Long fileSize;
    private String contentType;
}

package com.nextdoor.nextdoor.domain.s3store.adapter;

import com.nextdoor.nextdoor.common.Adapter;
import com.nextdoor.nextdoor.domain.post.port.S3ImageUploadPort;
import com.nextdoor.nextdoor.domain.s3store.dto.FileUploadRequestDto;
import com.nextdoor.nextdoor.domain.s3store.dto.FileUploadResponseDto;
import com.nextdoor.nextdoor.domain.s3store.service.S3Service;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@Adapter
@RequiredArgsConstructor
public class PostImageUploadAdapter implements S3ImageUploadPort {

    private final S3Service s3Service;

    @Override
    public String uploadProductImage(MultipartFile file, Long postId) {
        try {
            FileUploadRequestDto uploadRequest = FileUploadRequestDto.builder()
                    .file(file)
                    .serviceId("post")
                    .resourceId(postId.toString())
                    .resourceType("product_image")
                    .directory("posts/" + postId)
                    .build();

            FileUploadResponseDto uploadResponse = s3Service.uploadFile(uploadRequest);
            return uploadResponse.getFileUrl();
        } catch (Exception e) {
            log.error("Failed to upload image: {}", e.getMessage());
            throw new RuntimeException("Failed to upload image: " + e.getMessage());
        }
    }
}
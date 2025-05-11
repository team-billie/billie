package com.nextdoor.nextdoor.domain.post.port;

import org.springframework.web.multipart.MultipartFile;

/**
 * Port for uploading images to S3
 */
public interface S3ImageUploadPort {

    /**
     * Upload a product image to S3
     * @param file the image file to upload
     * @param postId the ID of the post the image belongs to
     * @return the URL of the uploaded image
     */
    String uploadProductImage(MultipartFile file, Long postId);
}
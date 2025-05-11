package com.nextdoor.nextdoor.domain.rental.port;

import com.nextdoor.nextdoor.domain.rental.service.dto.S3UploadResult;
import org.springframework.web.multipart.MultipartFile;

public interface S3ImageUploadPort {

    S3UploadResult upload(MultipartFile file, String directory);
}
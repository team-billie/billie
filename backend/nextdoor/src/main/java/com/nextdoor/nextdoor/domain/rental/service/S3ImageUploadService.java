package com.nextdoor.nextdoor.domain.rental.service;

import com.nextdoor.nextdoor.domain.rental.service.dto.S3UploadResult;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public interface S3ImageUploadService {

    S3UploadResult upload(MultipartFile file, String directory);
}

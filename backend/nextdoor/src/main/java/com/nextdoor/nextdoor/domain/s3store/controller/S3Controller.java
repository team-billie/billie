package com.nextdoor.nextdoor.domain.s3store.controller;

import com.nextdoor.nextdoor.domain.s3store.dto.FileDeleteRequestDto;
import com.nextdoor.nextdoor.domain.s3store.dto.FileUploadResponseDto;
import com.nextdoor.nextdoor.domain.s3store.service.S3Service;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/v1/s3-store")
@RequiredArgsConstructor
public class S3Controller {

    private final S3Service s3Service;

    @PostMapping(value = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<FileUploadResponseDto> uploadFile(
            @RequestParam("file") MultipartFile file,
            @RequestParam("serviceId") String serviceId,
            @RequestParam("resourceId") String resourceId,
            @RequestParam("resourceType") String resourceType,
            @RequestParam(value = "directory", required = false) String directory) {

        // RequestParam을 DTO로 변환
        var request = new com.nextdoor.nextdoor.domain.s3store.dto.FileUploadRequestDto(
                file, serviceId, resourceId, resourceType, directory);

        FileUploadResponseDto response = s3Service.uploadFile(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<Void> deleteFile(@RequestBody FileDeleteRequestDto request) {
        s3Service.deleteFile(request);
        return ResponseEntity.noContent().build();
    }

    // 원본 파일 이름이나 URL로 조회 API도 필요시 추가
}
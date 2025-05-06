package com.nextdoor.nextdoor.domain.s3store.service;


import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.DeleteObjectRequest;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.nextdoor.nextdoor.domain.s3store.domain.FileMetadata;
import com.nextdoor.nextdoor.domain.s3store.dto.FileDeleteRequestDto;
import com.nextdoor.nextdoor.domain.s3store.dto.FileUploadRequestDto;
import com.nextdoor.nextdoor.domain.s3store.dto.FileUploadResponseDto;
import com.nextdoor.nextdoor.domain.s3store.repository.FileMetadataRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class S3Service {

    private final AmazonS3 amazonS3;
    private final FileMetadataRepository fileMetadataRepository;

    @Value("${cloud.aws.s3.bucket}")
    private String bucketName;

    @Transactional
    public FileUploadResponseDto uploadFile(FileUploadRequestDto request) {
        MultipartFile file = request.getFile();

        // 기존 파일이 있는지 확인
        fileMetadataRepository.findByServiceIdAndResourceIdAndResourceType(
                        request.getServiceId(), request.getResourceId(), request.getResourceType())
                .ifPresent(existingFile -> {
                    // 기존 S3 파일 삭제
                    amazonS3.deleteObject(new DeleteObjectRequest(bucketName, existingFile.getFileName()));
                    // 메타데이터 삭제 (업데이트를 위해)
                    fileMetadataRepository.delete(existingFile);
                });

        // 파일 이름 생성 (UUID)
        String fileName = createFileName(request.getDirectory(), file.getOriginalFilename());

        try (InputStream inputStream = file.getInputStream()) {
            // S3에 파일 업로드
            ObjectMetadata metadata = new ObjectMetadata();
            metadata.setContentType(file.getContentType());
            metadata.setContentLength(file.getSize());

            amazonS3.putObject(new PutObjectRequest(
                    bucketName, fileName, inputStream, metadata)
                    .withCannedAcl(CannedAccessControlList.PublicRead));

            // 파일 URL 생성
            String fileUrl = amazonS3.getUrl(bucketName, fileName).toString();

            // 파일 메타데이터 저장
            FileMetadata fileMetadata = FileMetadata.builder()
                    .fileName(fileName)
                    .originalFileName(file.getOriginalFilename())
                    .contentType(file.getContentType())
                    .bucketName(bucketName)
                    .fileUrl(fileUrl)
                    .fileSize(file.getSize())
                    .serviceId(request.getServiceId())
                    .resourceId(request.getResourceId())
                    .resourceType(request.getResourceType())
                    .build();

            fileMetadata = fileMetadataRepository.save(fileMetadata);

            return FileUploadResponseDto.builder()
                    .id(fileMetadata.getId())
                    .fileName(fileMetadata.getFileName())
                    .originalFileName(fileMetadata.getOriginalFileName())
                    .fileUrl(fileMetadata.getFileUrl())
                    .fileSize(fileMetadata.getFileSize())
                    .contentType(fileMetadata.getContentType())
                    .build();

        } catch (IOException e) {
            log.error("파일 업로드 중 오류 발생: {}", e.getMessage());
            throw new S3Exception("파일 업로드에 실패했습니다: " + e.getMessage());
        }
    }

    @Transactional
    public void deleteFile(FileDeleteRequestDto request) {
        fileMetadataRepository.findByServiceIdAndResourceIdAndResourceType(
                        request.getServiceId(), request.getResourceId(), request.getResourceType())
                .ifPresent(fileMetadata -> {
                    // S3에서 파일 삭제
                    amazonS3.deleteObject(new DeleteObjectRequest(bucketName, fileMetadata.getFileName()));

                    // DB에서 메타데이터 삭제
                    fileMetadataRepository.delete(fileMetadata);

                    log.info("파일 삭제 성공: {}", fileMetadata.getFileName());
                });
    }

    // 파일 이름 생성 (UUID + 원본 파일 확장자)
    private String createFileName(String directory, String originalFileName) {
        String uuid = UUID.randomUUID().toString();
        String ext = extractExtension(originalFileName);

        if (directory != null && !directory.isEmpty()) {
            return directory + "/" + uuid + "." + ext;
        }

        return uuid + "." + ext;
    }

    // 파일 확장자 추출
    private String extractExtension(String originalFileName) {
        int pos = originalFileName.lastIndexOf(".");
        if (pos == -1) {
            return "";
        }
        return originalFileName.substring(pos + 1);
    }
}
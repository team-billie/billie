package com.nextdoor.nextdoor.domain.s3store.exception;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.multipart.MaxUploadSizeExceededException;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(S3Exception.class)
    public ResponseEntity<Map<String, String>> handleS3Exception(S3Exception e) {
        log.error("S3 에러 발생: {}", e.getMessage());

        Map<String, String> response = new HashMap<>();
        response.put("error", "S3 Operation Failed");
        response.put("message", e.getMessage());

        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
    }

    @ExceptionHandler(MaxUploadSizeExceededException.class)
    public ResponseEntity<Map<String, String>> handleMaxUploadSizeExceededException(MaxUploadSizeExceededException e) {
        log.error("파일 크기 초과 에러: {}", e.getMessage());

        Map<String, String> response = new HashMap<>();
        response.put("error", "File Size Exceeded");
        response.put("message", "업로드 가능한 최대 파일 크기를 초과했습니다.");

        return ResponseEntity.status(HttpStatus.PAYLOAD_TOO_LARGE).body(response);
    }
}
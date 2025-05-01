package com.nextdoor.nextdoor.domain.aianalysis.exception;

import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Slf4j
@RestControllerAdvice
public class AiAnalysisHandler {

    @ExceptionHandler({
            ExternalApiException.class
    })
    public ResponseEntity<ErrorResponseDto> handleExternalApiException(ExternalApiException e, HttpServletRequest request) {
        log.error(e.getMessage(), e);
        return ResponseEntity.internalServerError().body(new ErrorResponseDto(
                e.getErrorCode(),
                e.getMessage(),
                request.getRequestURI()
        ));
    }

    @ExceptionHandler({
            Exception.class
    })
    public ResponseEntity<ErrorResponseDto> handleException(Exception e, HttpServletRequest request) {
        log.error(e.getMessage(), e);
        return ResponseEntity.internalServerError().body(new ErrorResponseDto(
                "UNKNOWN",
                "알 수 없는 에러",
                request.getRequestURI()
        ));
    }
}

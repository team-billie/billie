package com.nextdoor.nextdoor.domain.auth.exception;

import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Slf4j
@RestControllerAdvice(basePackages = "com.nextdoor.nextdoor.domain.auth")
public class AuthHandler {

    @ExceptionHandler({
            RedirectUrlNotPresentException.class
    })
    public ResponseEntity<ErrorResponseDto> handleRedirectUrlNotPresentException(RedirectUrlNotPresentException e, HttpServletRequest request) {
        return logAndHandleException(HttpStatus.BAD_REQUEST, e, request);
    }

    @ExceptionHandler({
            Exception.class
    })
    public ResponseEntity<ErrorResponseDto> handleException(Exception e, HttpServletRequest request) {
        return logAndHandleException(HttpStatus.INTERNAL_SERVER_ERROR, e, "UNKNOWN", "알 수 없는 에러", request);
    }

    private ResponseEntity<ErrorResponseDto> logAndHandleException(
            HttpStatus httpStatus,
            BaseCustomException e,
            HttpServletRequest request
    ) {
        return logAndHandleException(httpStatus, e, e.getErrorCode(), request);
    }

    private ResponseEntity<ErrorResponseDto> logAndHandleException(
            HttpStatus httpStatus,
            Exception e,
            String errorCode,
            HttpServletRequest request
    ) {
        return logAndHandleException(httpStatus, e, errorCode, e.getMessage(), request);
    }

    private ResponseEntity<ErrorResponseDto> logAndHandleException(
            HttpStatus httpStatus,
            Exception e,
            String errorCode,
            String message,
            HttpServletRequest request
    ) {
        log.error(e.getMessage(), e);
        return ResponseEntity.status(httpStatus).body(new ErrorResponseDto(
                errorCode,
                message,
                request.getRequestURI()
        ));
    }
}

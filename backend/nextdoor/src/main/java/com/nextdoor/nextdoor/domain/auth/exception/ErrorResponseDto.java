package com.nextdoor.nextdoor.domain.auth.exception;

import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class ErrorResponseDto {

    private LocalDateTime timestamp;
    private String errorCode;
    private String message;
    private String path;

    public ErrorResponseDto(String errorCode, String message, String path) {
        this.timestamp = LocalDateTime.now();
        this.errorCode = errorCode;
        this.message = message;
        this.path = path;
    }
}

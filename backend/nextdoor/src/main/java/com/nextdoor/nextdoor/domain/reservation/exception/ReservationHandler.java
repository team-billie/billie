package com.nextdoor.nextdoor.domain.reservation.exception;

import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Slf4j
@RestControllerAdvice(basePackages = "com.nextdoor.nextdoor.domain.reservation")
public class ReservationHandler {

    @ExceptionHandler({
            AlreadyConfirmedException.class,
            IllegalStatusException.class
    })
    public ResponseEntity<ErrorResponseDto> handleBadRequestException(BaseCustomException e, HttpServletRequest request) {
        return logAndHandleException(HttpStatus.BAD_REQUEST, e, request);
    }

    @ExceptionHandler({
            UnauthorizedException.class
    })
    public ResponseEntity<ErrorResponseDto> handleAccessDeniedException(BaseCustomException e, HttpServletRequest request) {
        return logAndHandleException(HttpStatus.FORBIDDEN, e, request);
    }

    @ExceptionHandler({
            NoSuchReservationException.class
    })
    public ResponseEntity<ErrorResponseDto> handleNotFoundException(BaseCustomException e, HttpServletRequest request) {
        return logAndHandleException(HttpStatus.NOT_FOUND, e, request);
    }

    @ExceptionHandler({
            HttpMessageNotReadableException.class
    })
    public ResponseEntity<ErrorResponseDto> handleHttpMessageNotReadableException(HttpMessageNotReadableException e, HttpServletRequest request) {
        return logAndHandleException(HttpStatus.BAD_REQUEST, e, "ILLEGAL_REQUEST", "잘못된 요청입니다.", request);
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

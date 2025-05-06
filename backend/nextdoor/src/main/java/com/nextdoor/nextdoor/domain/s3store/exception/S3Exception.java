package com.nextdoor.nextdoor.domain.s3store.exception;

public class S3Exception extends RuntimeException {

    public S3Exception(String message) {
        super(message);
    }

    public S3Exception(String message, Throwable cause) {
        super(message, cause);
    }
}
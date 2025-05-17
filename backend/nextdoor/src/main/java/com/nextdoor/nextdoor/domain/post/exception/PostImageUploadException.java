package com.nextdoor.nextdoor.domain.post.exception;

import lombok.Getter;

@Getter
public class PostImageUploadException extends BaseCustomException {

    private final String errorCode = "POST_IMAGE_UPLOAD_ERROR";

    public PostImageUploadException() {
        super("게시물 이미지 업로드에 실패했습니다.");
    }

    public PostImageUploadException(String message) {
        super(message);
    }

    public PostImageUploadException(String message, Throwable cause) {
        super(message, cause);
    }

    public PostImageUploadException(Throwable cause) {
        super(cause);
    }
}
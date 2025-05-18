package com.nextdoor.nextdoor.domain.post.exception;

import lombok.Getter;

@Getter
public class PostIndexException extends BaseCustomException {

    private final String errorCode = "POST_INDEX_ERROR";

    public PostIndexException() {
        super("게시물 인덱싱 중 오류가 발생했습니다.");
    }

    public PostIndexException(String message) {
        super(message);
    }

    public PostIndexException(String message, Throwable cause) {
        super(message, cause);
    }

    public PostIndexException(Throwable cause) {
        super(cause);
    }
}
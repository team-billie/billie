package com.nextdoor.nextdoor.domain.post.exception;

import lombok.Getter;

@Getter
public class PostSearchException extends BaseCustomException {

    private final String errorCode = "POST_SEARCH_ERROR";

    public PostSearchException() {
        super("게시물 검색 중 오류가 발생했습니다.");
    }

    public PostSearchException(String message) {
        super(message);
    }

    public PostSearchException(String message, Throwable cause) {
        super(message, cause);
    }

    public PostSearchException(Throwable cause) {
        super(cause);
    }
}
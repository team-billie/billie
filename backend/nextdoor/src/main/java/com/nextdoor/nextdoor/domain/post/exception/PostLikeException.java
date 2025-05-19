package com.nextdoor.nextdoor.domain.post.exception;

import lombok.Getter;

@Getter
public class PostLikeException extends BaseCustomException {

    private final String errorCode = "POST_LIKE_ERROR";

    public PostLikeException() {
        super("게시물 좋아요 처리에 실패했습니다.");
    }

    public PostLikeException(String message) {
        super(message);
    }

    public PostLikeException(String message, Throwable cause) {
        super(message, cause);
    }

    public PostLikeException(Throwable cause) {
        super(cause);
    }
}
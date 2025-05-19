package com.nextdoor.nextdoor.domain.post.exception;

import lombok.Getter;

@Getter
public class NoSuchPostException extends BaseCustomException {

    private final String errorCode = "NO_SUCH_POST";

    public NoSuchPostException() {
        super("게시물이 존재하지 않습니다.");
    }

    public NoSuchPostException(String message) {
        super(message);
    }

    public NoSuchPostException(String message, Throwable cause) {
        super(message, cause);
    }

    public NoSuchPostException(Throwable cause) {
        super(cause);
    }
}
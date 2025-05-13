package com.nextdoor.nextdoor.domain.auth.exception;

import lombok.Getter;

@Getter
public class InvalidRedirectUrlException extends BaseCustomException {

    private final String errorCode = "REDIRECT_URI_NOT_PRESENT";

    public InvalidRedirectUrlException() {
        super();
    }

    public InvalidRedirectUrlException(String message) {
        super(message);
    }

    public InvalidRedirectUrlException(String message, Throwable cause) {
        super(message, cause);
    }

    public InvalidRedirectUrlException(Throwable cause) {
        super(cause);
    }
}

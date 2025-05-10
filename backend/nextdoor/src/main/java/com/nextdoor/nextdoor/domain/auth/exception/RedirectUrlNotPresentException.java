package com.nextdoor.nextdoor.domain.auth.exception;

import lombok.Getter;

@Getter
public class RedirectUrlNotPresentException extends BaseCustomException {

    private final String errorCode = "REDIRECT_URI_NOT_PRESENT";

    public RedirectUrlNotPresentException() {
        super();
    }

    public RedirectUrlNotPresentException(String message) {
        super(message);
    }

    public RedirectUrlNotPresentException(String message, Throwable cause) {
        super(message, cause);
    }

    public RedirectUrlNotPresentException(Throwable cause) {
        super(cause);
    }
}

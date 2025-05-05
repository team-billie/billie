package com.nextdoor.nextdoor.domain.aianalysis.exception;

import lombok.Getter;

@Getter
public class ExternalApiException extends BaseCustomException {

    private final String errorCode = "AI_EXTERNAL_API";

    public ExternalApiException() {
        super();
    }

    public ExternalApiException(String message) {
        super(message);
    }

    public ExternalApiException(String message, Throwable cause) {
        super(message, cause);
    }

    public ExternalApiException(Throwable cause) {
        super(cause);
    }
}

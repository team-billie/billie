package com.nextdoor.nextdoor.domain.aianalysis.exception;

import lombok.Getter;

@Getter
public class GeminiResponseProcessingException extends BaseCustomException{

    private final String errorCode = "GEMINI_RESPONSE_MAPPING_EXCEPTION";

    public GeminiResponseProcessingException() {
        super();
    }

    public GeminiResponseProcessingException(String message) {
        super(message);
    }

    public GeminiResponseProcessingException(String message, Throwable cause) {
        super(message, cause);
    }

    public GeminiResponseProcessingException(Throwable cause) {
        super(cause);
    }
}

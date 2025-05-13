package com.nextdoor.nextdoor.domain.auth.exception;

import lombok.Getter;

@Getter
public class UnsupportedOAuth2ProviderException extends BaseCustomException {

    private final String errorCode = "UNSUPPORTED_OAUTH2_PROVIDER";

    public UnsupportedOAuth2ProviderException() {
        super();
    }

    public UnsupportedOAuth2ProviderException(String message) {
        super(message);
    }

    public UnsupportedOAuth2ProviderException(String message, Throwable cause) {
        super(message, cause);
    }

    public UnsupportedOAuth2ProviderException(Throwable cause) {
        super(cause);
    }
}

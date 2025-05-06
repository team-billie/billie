package com.nextdoor.nextdoor.domain.fintech.client;

import org.springframework.http.HttpStatus;
import java.util.Map;

public class SsafyApiException extends RuntimeException {
    private final HttpStatus status;
    private final Map<String,Object> errorBody;

    public SsafyApiException(HttpStatus status, Map<String,Object> errorBody) {
        super("SSAFY API error " + status + " : " + errorBody);
        this.status = status;
        this.errorBody = errorBody;
    }

    public HttpStatus getStatus() { return status; }
    public Map<String,Object> getErrorBody() { return errorBody; }
}
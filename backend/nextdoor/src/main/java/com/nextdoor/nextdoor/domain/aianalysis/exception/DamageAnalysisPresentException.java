package com.nextdoor.nextdoor.domain.aianalysis.exception;

import lombok.Getter;

@Getter
public class DamageAnalysisPresentException extends BaseCustomException {

    private final String errorCode = "DAMAGE_ANALYSIS_PRESENT";

    public DamageAnalysisPresentException() {
        super();
    }

    public DamageAnalysisPresentException(String message, Throwable cause) {
        super(message, cause);
    }

    public DamageAnalysisPresentException(String message) {
        super(message);
    }

    public DamageAnalysisPresentException(Throwable cause) {
        super(cause);
    }
}

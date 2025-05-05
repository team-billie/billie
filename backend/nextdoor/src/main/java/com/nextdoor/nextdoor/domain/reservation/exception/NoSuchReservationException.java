package com.nextdoor.nextdoor.domain.reservation.exception;

public class NoSuchReservationException extends BaseCustomException {

    private final String errorCode = "NO_SUCH_RESERVATION";

    public NoSuchReservationException() {
        super();
    }

    public NoSuchReservationException(String message) {
        super(message);
    }

    public NoSuchReservationException(String message, Throwable cause) {
        super(message, cause);
    }

    public NoSuchReservationException(Throwable cause) {
        super(cause);
    }

    @Override
    public String getErrorCode() {
        return errorCode;
    }
}

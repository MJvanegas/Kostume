package com.kustoms.exceptions;

public class ReferenceNotFoundException extends RuntimeException{
    public ReferenceNotFoundException() {
        super();
    }

    public ReferenceNotFoundException(String message) {
        super(message);
    }

    public ReferenceNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }

    public ReferenceNotFoundException(Throwable cause) {
        super(cause);
    }
}

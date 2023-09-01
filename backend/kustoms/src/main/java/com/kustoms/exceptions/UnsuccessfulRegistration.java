package com.kustoms.exceptions;

public class UnsuccessfulRegistration  extends RuntimeException{

    public UnsuccessfulRegistration() {
        super();
    }

    public UnsuccessfulRegistration(String message) {
        super(message);
    }

    public UnsuccessfulRegistration(String message, Throwable cause) {
        super(message, cause);
    }

    public UnsuccessfulRegistration(Throwable cause) {
        super(cause);
    }
}

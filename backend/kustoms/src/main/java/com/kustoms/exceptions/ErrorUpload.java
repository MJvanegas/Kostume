package com.kustoms.exceptions;

public class ErrorUpload extends RuntimeException{

    public ErrorUpload() {
        super();
    }

    public ErrorUpload(String message) {
        super(message);
    }

    public ErrorUpload(String message, Throwable cause) {
        super(message, cause);
    }

    public ErrorUpload(Throwable cause) {
        super(cause);
    }

}

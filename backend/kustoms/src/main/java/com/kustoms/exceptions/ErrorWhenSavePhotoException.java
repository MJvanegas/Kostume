package com.kustoms.exceptions;

public class ErrorWhenSavePhotoException extends RuntimeException{

    public ErrorWhenSavePhotoException(String message) {
        super(message);
    }

    public ErrorWhenSavePhotoException(String message, Throwable cause) {
        super(message, cause);
    }
}

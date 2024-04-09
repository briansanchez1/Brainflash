package com.g5.brainflash.auth.exceptions;

/**
 * Custom exception for when a user tries to register with an email that is already in use.
 */
public class EmailNotEnabledException extends RuntimeException{
    public EmailNotEnabledException(String message) {
        super(message);
    }
}

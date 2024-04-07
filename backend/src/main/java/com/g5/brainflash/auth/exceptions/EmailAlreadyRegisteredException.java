package com.g5.brainflash.auth.exceptions;

/**
 * Custom exception for when a user tries to register with an email that is already in use.
 */
public class EmailAlreadyRegisteredException extends RuntimeException{
    public EmailAlreadyRegisteredException(String message) {
        super(message);
    }
}

package com.g5.brainflash.common.exceptions;

/**
 * UnauthorizedUserException class. Exception thrown when a user is not authorized to perform task.
 */
public class UnauthorizedUserException extends RuntimeException{
    public UnauthorizedUserException(String message) {
        super(message);
    }
}

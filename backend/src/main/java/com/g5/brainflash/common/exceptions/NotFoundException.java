package com.g5.brainflash.common.exceptions;

/**
 * NotFoundException class. Exception thrown when a resource is not found.
 */
public class NotFoundException extends RuntimeException{
    public NotFoundException(String message) {
        super(message);
    }
}

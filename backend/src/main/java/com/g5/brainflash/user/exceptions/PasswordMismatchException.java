package com.g5.brainflash.user.exceptions;

public class PasswordMismatchException extends RuntimeException{
    public PasswordMismatchException(String message)
    {
        super(message); 
    }
    
}

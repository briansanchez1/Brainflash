package com.g5.brainflash.exception;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.g5.brainflash.auth.exceptions.EmailAlreadyRegisteredException;
import com.g5.brainflash.auth.exceptions.EmailNotEnabledException;
import com.g5.brainflash.common.exceptions.NotFoundException;
import com.g5.brainflash.common.exceptions.UnauthorizedUserException;
import com.g5.brainflash.common.responses.ErrorResponse;
import com.g5.brainflash.user.exceptions.PasswordMismatchException;


/**
 * GlobalExceptionHandler. Handles exceptions thrown by the application.
 */
@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(BindException.class)
    public ResponseEntity<?> handleValidationExceptions(BindException ex) {
        Map<String, String> errors = new HashMap<>();

        String errorMessage = ex.getFieldErrors().stream()
            .map(fieldError -> fieldError.getDefaultMessage())
            .reduce((msg1, msg2) -> msg1 + ", " + msg2)
            .orElse("Validation failed");

        errors.put("message", errorMessage);

        return ResponseEntity.badRequest().body(errors);
    }

    @ExceptionHandler(EmailAlreadyRegisteredException.class)
    public ResponseEntity<?> handleValidationExceptions(EmailAlreadyRegisteredException ex) {
            return ResponseEntity
            .status(HttpStatus.CONFLICT)
            .body(new ErrorResponse(ex.getMessage()));
    }    

    @ExceptionHandler(EmailNotEnabledException.class)
    public ResponseEntity<?> handleValidationExceptions(EmailNotEnabledException ex) {
            return ResponseEntity
            .status(HttpStatus.CONFLICT)
            .body(new ErrorResponse(ex.getMessage()));
    }      

    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<?> handleValidationExceptions(NotFoundException ex) {
            return ResponseEntity
            .status(HttpStatus.NOT_FOUND)
            .body(new ErrorResponse(ex.getMessage()));
    }      
    
    @ExceptionHandler(UnauthorizedUserException.class)
    public ResponseEntity<?> handleValidationExceptions(UnauthorizedUserException ex) {
            return ResponseEntity
            .status(HttpStatus.UNAUTHORIZED)
            .body(new ErrorResponse(ex.getMessage()));
    }        

    @ExceptionHandler(PasswordMismatchException.class)
    public ResponseEntity<?> handleValidationExceptions(PasswordMismatchException ex){
        return ResponseEntity
        .status(HttpStatus.CONFLICT)
        .body(new ErrorResponse((ex.getMessage())));
    }


}

package com.g5.brainflash.auth;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin ;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.g5.brainflash.auth.exceptions.EmailAlreadyRegisteredException;
import com.g5.brainflash.common.ErrorResponse;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService service;

    /**
     * This method handles user registration requests.
     * 
     * @param request The RegisterRequest object containing user registration 
     * details.
     * 
     * @return ResponseEntity containing either a success response with user 
     * details or an error response if email is already registered or
     * request properties are missing
     */
    @PostMapping("/register")
    public ResponseEntity<?> register(
       @Valid @RequestBody RegisterRequest request, BindingResult bindingResult
    ) {
        // Handles validation errors
        if (bindingResult.hasErrors()) {
            return ResponseEntity.badRequest().body(bindingResult.getAllErrors());
        }

        try {
            return ResponseEntity.ok(service.register(request));
        } catch (EmailAlreadyRegisteredException e) {
            return ResponseEntity
            .status(HttpStatus.CONFLICT)
            .body(new ErrorResponse(e.getMessage()));
        }
        
    }
    
    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(
        @RequestBody AuthenticationRequest request
    ) {
        return ResponseEntity.ok(service.authenticate(request));
    }    

}

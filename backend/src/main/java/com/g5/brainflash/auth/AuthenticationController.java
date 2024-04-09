package com.g5.brainflash.auth;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

/**
 * AuthenticationController class. Handles user registration and authentication
 */
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
       @Valid @RequestBody RegisterRequest request
    ) {
        service.register(request);
        return ResponseEntity.ok().build();
    }
    
    /**
     * This method handles user authentication requests.
     * @param request The AuthenticationRequest object
     * @return Response to authentication attempt
     */
    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(
        @RequestBody AuthenticationRequest request
    ) {
        return ResponseEntity.ok(service.authenticate(request));
    }    

    /**
     * Validates the JWT token
     * @return Response with JWT token
     */
    @GetMapping("/validate")
    public ResponseEntity<?> validateJwt(
    ) {
        return ResponseEntity.ok().build();
    }         

    @GetMapping("/activate/{token}")
    public String confirm(@PathVariable String token) {
        return service.activateUser(token);
    }

}

package com.g5.brainflash.auth;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.g5.brainflash.auth.exceptions.EmailAlreadyRegisteredException;
import com.g5.brainflash.config.JwtService;
import com.g5.brainflash.user.Role;
import com.g5.brainflash.user.User;
import com.g5.brainflash.user.UserRepository;

import lombok.RequiredArgsConstructor;

/**
 * AuthenticationService class. Handles user registration and authentication.
 */
@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository userRepository;
    private final PasswordEncoder passEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authManager ;

    /**
     * Registers a new user in the system.
     * 
     * @param request The RegisterRequest object containing user registration 
     * details.
     * @return An AuthenticationResponse object containing the generated 
     * JWT token.
     * @throws EmailAlreadyRegisteredException If the email is already registered.
     */
    @Transactional
    public AuthenticationResponse register( RegisterRequest request ) {
        // Checks if the email already exists
        if ( userRepository.existsByEmail( request.getEmail() ) ) {
            throw new EmailAlreadyRegisteredException ( "Email is already registered." );
        }
        
        // Builds an user based on the request
        var user = User.builder()
            .name(request.getName())
            .email(request.getEmail())
            .password(passEncoder.encode(request.getPassword()))
            .role(Role.USER)
            .build();
        
        // Inserts user in the DB
        userRepository.save(user);

        // Generates a token based on the created user
        var jwtToken = jwtService.generateToken(user);

        return AuthenticationResponse
            .builder()
            .token(jwtToken)
            .build();

    }

    /**
     * Authenticates a user using the provided credentials and generates a 
     * JWT token upon successful authentication.
     * 
     * @param request The authentication request containing the user's email 
     * and password.
     * @return An AuthenticationResponse object containing the generated 
     * JWT token.
     * @throws AuthenticationException If authentication fails.
     */    
    @Transactional
    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        // Authenticate the user using the provided credentials
        authManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                request.getEmail(), 
                request.getPassword())
        );

        // Retrieve user information from the UserRepository 
        // based on the provided email
        var user = userRepository.findByEmail(request.getEmail())
            .orElseThrow();

        // Generate a JWT token with the extra claims and user detail
        var jwtToken = jwtService.generateToken(user);

        // Build and return an AuthenticationResponse object containing the 
        // generated JWT token
        return AuthenticationResponse
            .builder()
            .token(jwtToken)
            .build();

    }

}

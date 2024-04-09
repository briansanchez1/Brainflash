package com.g5.brainflash.auth;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.g5.brainflash.auth.exceptions.EmailAlreadyRegisteredException;
import com.g5.brainflash.auth.exceptions.EmailNotEnabledException;
import com.g5.brainflash.config.JwtService;
import com.g5.brainflash.email.EmailService;
import com.g5.brainflash.user.Role;
import com.g5.brainflash.user.User;
import com.g5.brainflash.user.UserRepository;

import jakarta.persistence.EntityNotFoundException;
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
    private final EmailService emailService;

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
    public void register( RegisterRequest request ) {
        // Checks if the email already exists
        if ( userRepository.existsByEmail( request.getEmail() ) ) {
            var user = userRepository.findByEmail(request.getEmail());

            // Ithrows exception since email registered and enabled
            if(user.get().isEnabled()) {
                throw new EmailAlreadyRegisteredException ( "Email is already registered." );
            }

            sendVerificationEmail(user.get());
            return;
        }
        
        // Builds an user based on the request
        var user = User.builder()
            .name(request.getName())
            .email(request.getEmail())
            .password(passEncoder.encode(request.getPassword()))
            .role(Role.USER)
            .enabled(false)
            .build();
        
        // Inserts user in the DB
        userRepository.save(user);

        // Generates a token based on the created user
        var jwtToken = jwtService.generateToken(user);
        String activationLink = "http://localhost:3000/verify-email/" + jwtToken;
        emailService.send(user.getEmail(), buildVerificationEmail(user.getName(), activationLink));
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
        // Retrieve user information from the UserRepository 
        // based on the provided email
        var user = userRepository.findByEmail(request.getEmail())
            .orElseThrow(
                () -> new RuntimeException("Email or password is incorrect."));
        
        if(!user.isEnabled()) {
            throw new EmailNotEnabledException ( 
                "Email has not been verified." 
                );
        }
        // Authenticate the user using the provided credentials
        authManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                request.getEmail(), 
                request.getPassword())
        );

        // Generate a JWT token with the extra claims and user detail
        var jwtToken = jwtService.generateToken(user);

        // Build and return an AuthenticationResponse object containing the 
        // generated JWT token
        return AuthenticationResponse
            .builder()
            .token(jwtToken)
            .build();

    }

    private String buildVerificationEmail(String name, String link) {
        return "<div style=\"text-align: center;\">" +
            "<h2>BrainFlash Email Verification</h2>" +
            "<p>Hello "+name+", please click the button below to verify your email address.</p>" +
            "<p>This email verification expires in one day.</p>" +
            "<p>If you didn't request this, you can safely ignore this email.</p>" +
            "<a href=\"" + link + "\" style=\"display: inline-block; padding: 10px 20px; background-color: #007bff; color: #fff; text-decoration: none; border-radius: 5px;\">Verify Email</a>" +
        "</div>";
    }

    private void sendVerificationEmail(User user){
        var jwtToken = jwtService.generateToken(user);
        String activationLink = "http://localhost:3000/verify-email/" + jwtToken;
        emailService.send(user.getEmail(), buildVerificationEmail(user.getName(), activationLink));
    }
    

    @Transactional
    public String activateUser(String token) {
        final String userEmail;
        userEmail = jwtService.extractUsername(token);
        
        if(userEmail != null && !jwtService.isTokenExpired(token)){
            var user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));
            
            if(user.isEnabled()){
                return "User already verified.";
            }
                
            user.setEnabled(true);
            userRepository.save(user);

            return "User has been verified.";
        } 
        
        return "Token Error";
    }

}

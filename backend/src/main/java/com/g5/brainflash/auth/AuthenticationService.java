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

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository userRepository;
    private final PasswordEncoder passEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authManager ;

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

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                request.getEmail(), 
                request.getPassword())
        );

        var user = userRepository.findByEmail(request.getEmail())
            .orElseThrow();
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse
            .builder()
            .token(jwtToken)
            .build();

    }

}

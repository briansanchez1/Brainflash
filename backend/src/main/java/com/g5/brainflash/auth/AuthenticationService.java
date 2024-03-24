package com.g5.brainflash.auth;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.g5.brainflash.config.JwtService;
import com.g5.brainflash.user.Role;
import com.g5.brainflash.user.User;
import com.g5.brainflash.user.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository repository;
    private final PasswordEncoder passEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authManager ;

    public AuthenticationResponse register( RegisterRequest request ) {

        if ( repository.existsByEmail( request.getEmail() ) ) {
            throw new IllegalArgumentException( "Email is already registered" ) ;
            }
        
        var user = User.builder()
            .name(request.getName())
            .email(request.getEmail())
            .password(passEncoder.encode(request.getPassword()))
            .role(Role.USER)
            .build();
        
      
        repository.save(user);

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

        var user = repository.findByEmail(request.getEmail())
            .orElseThrow();
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse
            .builder()
            .token(jwtToken)
            .build();

    }

}

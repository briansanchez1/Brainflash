package com.g5.brainflash.user;

import lombok.RequiredArgsConstructor;

import java.security.Principal;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.g5.brainflash.auth.exceptions.EmailAlreadyRegisteredException;
import com.g5.brainflash.common.responses.DeleteResponse;
import com.g5.brainflash.config.JwtService;
import com.g5.brainflash.email.EmailService;
import com.g5.brainflash.user.exceptions.PasswordMismatchException;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import com.g5.brainflash.user.exceptions.EmailMismatchException;


/**
 * User service class. Handles logic relating to users in the system
 */
@Service
@RequiredArgsConstructor

public class UserService 
{
    private final PasswordEncoder passwordEncoder; 
    private final UserRepository repository; 
    private final JwtService jwtService;
    private final EmailService emailService;

    /**
     * Change the password of the user
     * 
     * @param request       The password change request object
     * @param connectedUser The connected user
     */
    public void changePassword(PasswordChangeRequest request, Principal connectedUser) {
        var user = (User) ((UsernamePasswordAuthenticationToken) connectedUser).getPrincipal();

        // see if the current password is correct
        if (!passwordEncoder.matches(request.getCurrentPassword(), user.getPassword())) {
            throw new PasswordMismatchException("Wrong Password");
        }

        // see if the passwords are the same
        if (!request.getNewPassword().equals(request.getConfirmationPassword())) {
            throw new PasswordMismatchException("Passwords Mismatch!");
        }

        // replace old password with new one
        user.setPassword(passwordEncoder.encode(request.getNewPassword()));

        // save new password
        repository.save(user);
    }

    /**
     * Change the email of the user
     * 
     * @param request       The emails change request object
     * @param connectedUser The connected user
     */
    public void changeEmail(EmailChangeRequest request, Principal connectedUser) {
        var user = (User) ((UsernamePasswordAuthenticationToken) connectedUser).getPrincipal();

        // see if the new email and re-typed email are the same
        if (!request.getNewEmail().equals(request.getConfirmationEmail())) {
            throw new EmailMismatchException("Emails do not match");
        }

        // see if the current password is correct
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new PasswordMismatchException("Wrong Password");
        }

        if (repository.existsByEmail(request.getNewEmail())) {
            throw new EmailAlreadyRegisteredException("Email is already registered.");
        }

        // replace old email with new one
        user.setEmail(request.getNewEmail());

        // save new email
        repository.save(user);
    }

    /**
     * Delete the user account by ID
     */
    public DeleteResponse deleteUserAccount(Principal connectedUser) {
        var user = (User) ((UsernamePasswordAuthenticationToken) connectedUser).getPrincipal();

        repository.deleteById(user.getId());

        return new DeleteResponse("User account deleted successfully");
    }


    @Transactional
    public String resetPasswordEmail( ResetPasswordEmailRequest request ) {
        // Checks if the email already exists
        if ( repository.existsByEmail( request.getEmail() ) ) {
            var user = repository.findByEmail(request.getEmail()).orElseThrow();
            var jwtToken = jwtService.generateToken(user);
            String activationLink = "http://localhost:3000/reset-password/" + jwtToken;
            emailService.send(user.getEmail(), buildResetPassEmail(user.getName(), activationLink));
            return "Password reset email sent.";
        }

        return "Email not found.";
    }

    

    @Transactional
    public String resetPassword(String token, ResetPasswordRequest request ) {
        //see if the passwords are the same
        if(!request.getPassword().equals(request.getConfirmationPassword()))
        {
            throw new PasswordMismatchException("Passwords Mismatch!"); 
        }

        final String userEmail;
        userEmail = jwtService.extractUsername(token);
        
        if(userEmail != null && !jwtService.isTokenExpired(token)){
            var user = repository.findByEmail(userEmail)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

            //replace old password with new one
            user.setPassword(passwordEncoder.encode(request.getPassword()));

            //save new password
            repository.save(user);                 

            return "Password has been reset.";
        } 
        
        return "Token Error";
    }    

    private String buildResetPassEmail(String name, String link) {
        return "<div style=\"text-align: center;\">" +
            "<h2>Brainflash Password Reset</h2>" +
            "<p>Hello "+name+", please click the button below to reset your password.</p>" +
            "<p>This password reset link expires in one day.</p>" +
            "<p>If you didn't request this, you can safely ignore this email.</p>" +
            "<a href=\"" + link + "\" style=\"display: inline-block; padding: 10px 20px; background-color: #007bff; color: #fff; text-decoration: none; border-radius: 5px;\">Reset Password</a>" +
        "</div>";
    }
}

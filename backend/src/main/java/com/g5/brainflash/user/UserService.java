package com.g5.brainflash.user;

import lombok.RequiredArgsConstructor;

import java.security.Principal;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.g5.brainflash.user.exceptions.PasswordMismatchException;



@Service
@RequiredArgsConstructor

public class UserService 
{
    private final PasswordEncoder passwordEncoder; 
    private final UserRepository repository; 

    public void changePassword(PasswordChangeRequest request, Principal connectedUser)
    {
        var user = (User) ((UsernamePasswordAuthenticationToken) connectedUser).getPrincipal(); 

        //see if the current password is correct
        if(!passwordEncoder.matches(request.getCurrentPassword(), user.getPassword()))
        {
            throw new PasswordMismatchException("Wrong Password"); 
        }

        //see if the passwords are the same
        if(!request.getNewPassword().equals(request.getConfirmationPassword()))
        {
            throw new PasswordMismatchException("Passwords Mismatch!"); 
        }

        //replace old password with new one
        user.setPassword(passwordEncoder.encode(request.getNewPassword()));

        //save new password
        repository.save(user); 
    }
}

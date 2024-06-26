package com.g5.brainflash.user;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;

import java.security.Principal;

/**
 * User controller class. Used to handle user-related requests.
 */
@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService service; 

    /**
     * Change the password of the user
     * 
     * @param request The password change request object
     * @param connectedUser The connected user
     * @return Response with result of changing password
     */
    @PostMapping("/change-password")
    public ResponseEntity<?> PasswordChangeRequest(@Valid @RequestBody PasswordChangeRequest request, Principal connectedUser)
    {
        service.changePassword(request, connectedUser);
        return ResponseEntity.ok().build();
    }
    
    @PostMapping("/change-email")
    public ResponseEntity<?> EmailChangeRequest(@Valid @RequestBody EmailChangeRequest request, Principal connectedUser)
    {
        service.changeEmail(request, connectedUser);
        return ResponseEntity.ok().build();
    }
    
    /**
     * Delete the user account
     * 
     * @param connectedUser The connected user
     * @return Response with result of deleting user account
     */
    @GetMapping("/delete-account")
    public ResponseEntity<?> deleteUserAccount(Principal connectedUser)
    {
        service.deleteUserAccount(connectedUser);
        return ResponseEntity.ok(service.deleteUserAccount(connectedUser));
    }

    @PostMapping("/reset-password-email")
    public ResponseEntity<?> resetPass(@Valid @RequestBody ResetPasswordEmailRequest request)
    {
        return ResponseEntity.ok(service.resetPasswordEmail(request));
    }

    @PutMapping("/reset-password/{token}")
    public ResponseEntity<?> resetPass(@PathVariable String token, @Valid @RequestBody ResetPasswordRequest request)
    {
        return ResponseEntity.ok(service.resetPassword(token, request));
    }    


}

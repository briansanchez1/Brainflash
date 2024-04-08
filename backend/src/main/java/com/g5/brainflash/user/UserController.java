package com.g5.brainflash.user;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;

import java.security.Principal;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor

public class UserController {

    private final UserService service; 

    @PatchMapping("/change-password")
    public ResponseEntity<?> PasswordChangeRequest(@Valid @RequestBody PasswordChangeRequest request, Principal connectedUser)
    {
        service.changePassword(request, connectedUser);
        return ResponseEntity.ok().build();
    }
    
}

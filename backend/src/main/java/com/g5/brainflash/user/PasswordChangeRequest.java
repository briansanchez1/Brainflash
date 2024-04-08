package com.g5.brainflash.user;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder

public class PasswordChangeRequest {
    @NotBlank(message="Current password must be entered")
    private String currentPassword; 

    @NotBlank(message="Enter new password")
    private String newPassword;

    @NotBlank(message="Re-enter new password")
    @Size(
        min = 6,
        max = 20,
        message = "Password must be between {min} and {max} characters long.")
    private String confirmationPassword; 
}

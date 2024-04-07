package com.g5.brainflash.user;

import jakarta.validation.constraints.NotBlank;
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
    private String confirmationPassword; 
}

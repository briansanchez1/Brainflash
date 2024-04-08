package com.g5.brainflash.user;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder

public class EmailChangeRequest {
    @NotBlank(message = "Current email must be entered")
    private String currentEmail;

    @NotBlank(message = "Enter new email")
    private String newEmail;

    @NotBlank(message = "Re-type the new email")
    private String confirmationEmail;

    @NotBlank(message = "Enter your current password")
    @Size(min = 6, max = 20, message = "Password must be between {min} and {max} characters long.")
    private String password;
}

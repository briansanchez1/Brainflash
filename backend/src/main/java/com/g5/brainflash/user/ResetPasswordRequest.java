package com.g5.brainflash.user;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ResetPasswordRequest {
    @NotBlank(message = "Password is required")
    @Size(
        min = 6,
        max = 20,
        message = "Password must be between {min} and {max} characters long.")
    private String password;

    @NotBlank(message = "Confirmation password is required")
    @Size(
        min = 6,
        max = 20,
        message = "Confirmation password must be between {min} and {max} characters long.")
    private String confirmationPassword;
}


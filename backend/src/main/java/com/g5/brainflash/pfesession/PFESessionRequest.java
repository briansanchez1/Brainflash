package com.g5.brainflash.pfesession;

import java.time.LocalDate ;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * PFE Session request object. Used to create and update PFE session
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PFESessionRequest {

    @NotBlank( message = "Title is required" )
    @Size( min = 2, max = 40, message = "Title must be between {min} and {max} characters long." )
    private String title ;

    @NotNull( message = "Ente a start date." )
    private LocalDate startDate ;

    @NotNull( message = "Ente a start date." )
    private LocalDate endDate ;

    private Integer deckId ;

    private Integer categoryId ;

}
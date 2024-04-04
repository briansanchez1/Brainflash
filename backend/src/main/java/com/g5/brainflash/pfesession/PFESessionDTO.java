package com.g5.brainflash.pfesession;

import java.time.LocalDate ;



import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * PFE Session DTO class. Represents a pfe session object in the system.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PFESessionDTO {

    private Integer id ;
    private String title ;
    private LocalDate startDate ;
    private LocalDate endDate ;
    private Integer deckId ;
    private Integer categoryId ;
}
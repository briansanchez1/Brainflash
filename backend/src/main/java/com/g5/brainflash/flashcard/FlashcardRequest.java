package com.g5.brainflash.flashcard;

import jakarta.persistence.Column;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Flashcard Request. Contains the details of a flashcard.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FlashcardRequest {
    
    @NotBlank(message = "Question is required")
    @Size(min = 3, max = 50,   message = "Queestion must be between {min} and {max} characters long.")
    private String question;

    @NotBlank(message = "Answer is required")
    @Size(max = 200 , message = "Title must be less than and {max} characters long." )
    private String answer;

    @NotNull(message = "Category is required")
    @Column(name = "category_id")
    private Integer categoryId;

    @Column(name = "deck_id")
    private Integer deckId;
}

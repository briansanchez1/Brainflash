package com.g5.brainflash.flashcard;
import jakarta.persistence.Column;
import jakarta.validation.constraints.NotBlank;
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
    private String question;

    @NotBlank(message = "Answer is required")
    private String answer;

    @NotBlank(message = "Category is required")
    @Column(name = "category_id")
    private Integer categoryId;

    //private Deck deck;
}
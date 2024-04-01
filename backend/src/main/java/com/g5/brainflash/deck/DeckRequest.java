package com.g5.brainflash.deck;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Deck request object. Used to create and update decks
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DeckRequest {
    @NotBlank(message = "Title is required")
    @Size(
        min = 2,
        max = 19,
        message = "Title must be between {min} and {max} characters long.")
    private String title;

    private Integer numCards;
}

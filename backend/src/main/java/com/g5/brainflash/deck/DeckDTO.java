package com.g5.brainflash.deck;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Deck DTO class. Represents a deck object in the system.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DeckDTO {
    private Integer id;
    private String title;
    private Integer cardCount;
}

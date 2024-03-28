package com.g5.brainflash.flashcard;

import com.g5.brainflash.category.Category;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Flashcard DTO class. Represents a flashcard object in the system.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FlashcardDTO {
    private Integer id;
    private String question;
    private String answer;
    private Category category;
}

package com.g5.brainflash.flashcard;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Flashcard repository interface. Used to interact with the database for flashcard-related purposes.
 */
public interface FlashcardRepository extends JpaRepository<Flashcard, Integer>{
    /**
     * Find single flashcard by ID
     * @param id ID of the requested flashcard
     * @return Flashcard with the requested ID
     */
    Optional<Flashcard> findById(Integer id);

    /**
     * Find all flashcards by user ID
     * @param userId ID of the user
     * @return List of all flashcards by the user
     */
    List<Flashcard> findAllByUserId(Integer userId);

    /**
     * Find all flashcards by deck ID
     * @param deckId ID of the deck
     * @return List of all flashcards in the deck
     */
    List<Flashcard> findAllByDeckId(Integer deckId);

    /**
     * Find all flashcards by category ID
     * @param categoryId ID of the category
     * @return List of all flashcards in the category
     */
    List<Flashcard> findAllByCategoryId(Integer categoryId);

    /**
     * Delete flashcard with specific ID
     */
    void deleteById(Integer id);
}

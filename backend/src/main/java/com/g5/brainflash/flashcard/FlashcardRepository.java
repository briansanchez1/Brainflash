package com.g5.brainflash.flashcard;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface FlashcardRepository extends JpaRepository<Flashcard, Integer>{
    /**
     * Find all flashcards
     * @return List of all flashcards
     */
    List<Flashcard> findAll();

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
    List<Flashcard> findByUserId(Integer userId);

    /**
     * Save flashcard to database
     */
    @SuppressWarnings("unchecked")
    Flashcard save(Flashcard flashcard);

    /**
     * Delete flashcard with specific ID
     */
    void deleteById(Integer id);
}

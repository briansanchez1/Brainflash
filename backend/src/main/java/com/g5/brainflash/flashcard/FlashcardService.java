package com.g5.brainflash.flashcard;

import java.util.List;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class FlashcardService {

    private final FlashcardRepository flashcardRepository;

    /**
     * This method returns all flashcards in the database.
     * 
     * @return List of Flashcard objects
     */
    public List<Flashcard> getAllFlashcards() {
        return flashcardRepository.findAll();
    }

    /**
     * This method returns all flashcards by a user.
     * @param id The id of the user
     * @return List of Flashcard objects created by the user
     */
    public List<Flashcard> getFlashcardsByUserId(Integer id) {
        return flashcardRepository.findByUserId(id);
    }

    /**
     * This method returns a flashcard by its id.
     * 
     * @param id The id of the flashcard to be retrieved
     * @return Flashcard object
     */
    public Flashcard getFlashcardById(Integer id) {
        return flashcardRepository.findById(id).orElse(null);
    }

    /**
     * This method saves a flashcard in the database.
     * @param request The FlashcardRequest object containing the flashcard details
     * @return Flashcard object
     */
    public Flashcard saveFlashcard(FlashcardRequest request) {
        Flashcard flashcard = Flashcard.builder()
            .question(request.getQuestion())
            .answer(request.getAnswer())
            .build();

        
        if(flashcard instanceof Flashcard) {
            return flashcardRepository.save(flashcard);
        }  
        
        return null;
    }

    /**
     * This method deletes a flashcard from the database.
     * @param id ID of the flashcard to be deleted
     */
    public void deleteFlashcard(Integer id) {
        flashcardRepository.deleteById(id);
    }
}

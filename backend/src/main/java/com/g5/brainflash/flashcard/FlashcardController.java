package com.g5.brainflash.flashcard;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
/**
 * Flashcard Controller. Handles requests related to flashcards.
 */
public class FlashcardController {
    private final FlashcardService service;

    /**
    * Handles getting all flashcards for the user
    * @param id The id of the user
    * @return Response containing list of all flashcards created by user
    */
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/user/{id}")
    public ResponseEntity<List<Flashcard>> getFlashcardsByUserId(@PathVariable Integer id) {
        return ResponseEntity.ok(service.getFlashcardsByUserId(id));
    }

    /**
     * Handles getting single flashcard by ID
     * @param id The id of the flashcard
     * @return Response containing the flashcard
     */
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/{id}")
    public ResponseEntity<Flashcard> getFlashcardById(@PathVariable Integer id) {
        return ResponseEntity.ok(service.getFlashcardById(id));
    }

    /**
     * Handles adding a flashcard to the database
     * @param request The FlashcardRequest object containing the flashcard details
     * @return Response containing the saved flashcard
     */
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/add")
    public ResponseEntity<Flashcard> saveFlashcard(FlashcardRequest request) {
        return ResponseEntity.ok(service.saveFlashcard(request));
    }

    /**
     * Handles deleting specified flashcard from database
     * @param id The id of the flashcard to be deleted
     * @return Response containing the deleted flashcard
     */
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/delete/{id}")
    public ResponseEntity<Void> deleteFlashcard(@PathVariable Integer id) {
        service.deleteFlashcard(id);
        return ResponseEntity.noContent().build();
    }
}

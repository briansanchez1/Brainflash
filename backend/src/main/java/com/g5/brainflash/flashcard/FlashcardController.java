package com.g5.brainflash.flashcard;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.g5.brainflash.common.responses.ErrorResponse;
import com.g5.brainflash.user.User;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/flashcards")
@RequiredArgsConstructor
/**
 * Flashcard Controller. Handles requests related to flashcards.
 */
public class FlashcardController {
    private final FlashcardService flashcardService;

    /**
     * Save a flashcard to the database
     * @param user The user creating/editing flashcard
     * @param request The flashcard request object
     * @return Response with result of saving flashcard
     */
    @PostMapping("/add")
    public ResponseEntity<?> saveFlashcard(
        @AuthenticationPrincipal User user, @Valid @RequestBody FlashcardRequest request
    ) {
        return ResponseEntity.ok(flashcardService.saveFlashcard(user, request));
    }

    /**
     * Delete a flashcard from the database
     * @param user The user deleting the flashcard
     * @param id ID of the flashcard to delete
     * @return  Response with result of deleting flashcard
     */
    @GetMapping("/delete/{id}")
    public ResponseEntity<?> deleteFlashcard(
        @AuthenticationPrincipal User user, @PathVariable Integer id
    ) {
        return ResponseEntity.ok(flashcardService.deleteFlashcard(user.getId(), id));
    }

    /**
     * Update a flashcard's information in the database
     * @param user The user updating the flashcard
     * @param id ID of the flashcard to update
     * @param request The flashcard request object
     * @return Response with result of updating flashcard
     */
    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateFlashcard(
        @AuthenticationPrincipal User user, @PathVariable Integer id, @RequestBody FlashcardRequest request
    ) {
        return ResponseEntity.ok(flashcardService.updateFlashcard(user.getId(), id, request));
    }

    /**
     * Get all flashcards for a user
     * @param user The user to get flashcards for
     * @return Response with list of flashcards
     */
    @GetMapping
    public ResponseEntity<?> getAllFlashcards(@AuthenticationPrincipal User user) {
        try {
            return ResponseEntity.ok(flashcardService.getAllFlashcardsByUserId(user.getId()));
        }
        catch (Exception e) {
            return ResponseEntity.badRequest().body(new ErrorResponse(e.getMessage()));
        }
        
    }

    /**
     * Get a flashcard by ID
     * @param user The user to get flashcard for
     * @param id The ID of the flashcard to get
     * @return Response with flashcard
     */
    @GetMapping("/{id}")
    public ResponseEntity<?> getFlashcardById(@AuthenticationPrincipal User user, @PathVariable Integer id) {
        return ResponseEntity.ok(flashcardService.getFlashcardById(user.getId(), id));
    }

    /**
     * Get all flashcards for a specified Category
     * @param categoryId The ID of the category to get flashcards for
     * @return Response with list of flashcards
     */
    @GetMapping("/category/{categoryId}")
    public ResponseEntity<?> getFlashcardsByCategory(
        @AuthenticationPrincipal User user, @PathVariable Integer categoryId
    ) {
        return ResponseEntity.ok(flashcardService.getAllFlashcardsByCategoryId(categoryId));
    }

    /**
     * Get all flashcards for a specified Deck
     * @param deckId The ID of the deck to get flashcards for
     * @return Response with list of flashcards
     */
    @GetMapping("/deck/{deckId}")
    public ResponseEntity<?> getFlashcardsByDeck(
        @AuthenticationPrincipal User user, @PathVariable Integer deckId
    ) {
        return ResponseEntity.ok(flashcardService.getAllFlashcardsByDeckId(deckId));
    }
}

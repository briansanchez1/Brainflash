package com.g5.brainflash.deck;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.g5.brainflash.user.User;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

/**
 * Deck controller class. Used to handle deck-related requests.
 */
@RestController
@RequestMapping("/api/v1/decks")
@RequiredArgsConstructor
public class DeckController {
    private final DeckService deckService;

    /**
     * Save a deck to the database
     * @param user The user creating/editing deck
     * @param request The deck request object
     * @return Response with result of saving deck
     */
    @PostMapping("/add")
    public ResponseEntity<?> saveDeck(
        @AuthenticationPrincipal User user, @Valid @RequestBody DeckRequest request
    ) {
        return ResponseEntity.ok(deckService.saveDeck(user, request));
    }

    /**
     * Delete a deck from the database
     * @param user The user deleting the deck
     * @param id ID of the deck to delete
     * @return Response with result of deleting deck
     */
    @GetMapping("/delete/{id}")
    public ResponseEntity<?> deleteDeck(
        @AuthenticationPrincipal User user, @PathVariable Integer id
    ) {
        return ResponseEntity.ok(deckService.deleteDeck(user.getId(), id));
    }

    /**
     * Update a deck's information in the database
     * @param user The user owning the deck to be updated
     * @param id ID of the deck to update
     * @param request The deck request object
     * @return Response with result of updating deck
     */
    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateDeck(
        @AuthenticationPrincipal User user, @PathVariable Integer id, @Valid @RequestBody DeckRequest request
    ) {
        return ResponseEntity.ok(deckService.updateDeck(user.getId(), id, request));
    }

    /**
     * Get all decks for a user
     * @param user The user to get decks for
     * @return Response with list of all decks for user
     */
    @GetMapping
    public ResponseEntity<?> getAllDecks(@AuthenticationPrincipal User user) {
        try {
            return ResponseEntity.ok(deckService.getAllDecksByUserId(user.getId()));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}

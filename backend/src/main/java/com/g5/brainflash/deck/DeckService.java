package com.g5.brainflash.deck;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.g5.brainflash.common.exceptions.NotFoundException;
import com.g5.brainflash.common.exceptions.UnauthorizedUserException;
import com.g5.brainflash.common.responses.DeleteResponse;
import com.g5.brainflash.common.responses.UpdateResponse;
import com.g5.brainflash.flashcard.Flashcard;
import com.g5.brainflash.user.User;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

/**
 * Deck service class. Handles logic relating to decks in the system
 */
@Service
@RequiredArgsConstructor
public class DeckService {
    private final DeckRepository deckRepository;

    /**
     * Build deck DTO to be saved
     * 
     * @param user    The user creating/editing deck
     * @param request The deck request object
     * @return The deck DTO to be saved
     */
    @Transactional
    public DeckDTO saveDeck(User user, DeckRequest request) {
        Deck deck = Deck.builder().title(request.getTitle()).cardCount(0).user(user).build();

        deck = deckRepository.save(deck);

        return DeckDTO.builder()
            .id(deck.getId())
            .title(deck.getTitle())
            .cardCount(0)
            .build();
    }

    /**
     * Get single deck by ID
     * 
     * @param userId The ID of the user
     * @param id     The ID of the deck
     * @return deck DTO
     */
    @Transactional
    public DeckDTO getDeckById(Integer userId, Integer id) {
        Optional < Deck > optDeck = deckRepository.findById(id);

        // Checks if the deck exists
        if (!optDeck.isPresent()) {
            throw new NotFoundException("Deck not found.");
        }

        Deck deck = optDeck.get();

        // Checks if the user owns the deck
        if (deck.getUser().getId() != userId) {
            throw new UnauthorizedUserException("User is not authorized to view this deck.");
        }

        return new DeckDTO(
            deck.getId(),
            deck.getTitle(),
            deck.getCardCount());
    }

    /**
     * Get all decks for a user
     * 
     * @param userId The ID of the user
     * @return List of all deck DTOs
     */
    @Transactional
    public List < DeckDTO > getAllDecksByUserId(Integer userId) {
        List < Deck > decks = deckRepository.findAllByUserId(userId);
        return decks.stream()
            .map(deck -> new DeckDTO(
                deck.getId(),
                deck.getTitle(),
                deck.getCardCount()))
            .collect(Collectors.toList());
    }

    /**
     * Delete a deck from the database
     * 
     * @param userId The ID of the user
     * @param id     The ID of the deck to delete
     * @return Response with result of deleting deck
     */
    @Transactional
    public DeleteResponse deleteDeck(Integer userId, Integer id) {
        Optional < Deck > optDeck = deckRepository.findById(id);

        // Check if deck exists
        if (!optDeck.isPresent()) {
            throw new NotFoundException("Deck not found.");
        }

        Deck deck = optDeck.get();

        // Remove flashcard from deck and update count
        List<Flashcard> flashcards = deck.getFlashcards();

        for (Flashcard flashcard: flashcards) {
            flashcard.setDeck(null);
            flashcard.getCategory().setCardCount(flashcard.getCategory().getCardCount() - 1);
        }

        // Check if deck belongs to user
        if (!deck.getUser().getId().equals(userId)) {
            throw new UnauthorizedUserException("Unauthorized: You do not have permission to delete this deck.");
        }

        deckRepository.deleteById(id);
        return new DeleteResponse("Deck deleted.");
    }

    /**
     * Update a deck's information in the database
     * 
     * @param userId  The ID of the user
     * @param id      The ID of the deck to update
     * @param request The deck request object
     * @return Response with result of updating deck
     */
    @Transactional
    public UpdateResponse updateDeck(Integer userId, Integer id, DeckRequest request) {
        Optional < Deck > optDeck = deckRepository.findById(id);

        // Check if deck exists
        if (!optDeck.isPresent()) {
            throw new NotFoundException("Deck not found.");
        }

        Deck deck = optDeck.get();

        // Check if deck belongs to user
        if (!deck.getUser().getId().equals(userId)) {
            throw new UnauthorizedUserException("Unauthorized: You do not have permission to update this deck.");
        }

        deck.setTitle(request.getTitle());
        deck = deckRepository.save(deck);

        return new UpdateResponse("Deck updated.");
    }
}
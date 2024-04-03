package com.g5.brainflash.deck;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import com.g5.brainflash.user.User;
import com.g5.brainflash.common.exceptions.NotFoundException;
import com.g5.brainflash.common.exceptions.UnauthorizedUserException;
import com.g5.brainflash.common.responses.DeleteResponse;
import com.g5.brainflash.common.responses.UpdateResponse;

/**
 * Contains unit tests for DeckService
 */
public class DeckServiceTest {
    @InjectMocks 
    private DeckService deckService;

    @Mock
    private DeckRepository deckRepository;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    /**
     * Test saving deck
     */
    @Test
    public void testSaveDeck() {
        // Prepare test data
        User user = new User();
        DeckRequest request = new DeckRequest();
        request.setTitle("Test Deck");
        request.setNumCards(0);

        Deck savedDeck = new Deck();
        savedDeck.setId(1);
        savedDeck.setTitle("Test Deck");
        savedDeck.setNumCards(0);
        savedDeck.setUser(user);

        // Mock the behavior of dependencies
        when(deckRepository.save(any(Deck.class))).thenReturn(savedDeck);

        // Perform test
        DeckDTO result = deckService.saveDeck(user, request);

        // Assert result
        assertEquals(savedDeck.getId(), result.getId());
        assertEquals(savedDeck.getTitle(), result.getTitle());
        assertEquals(savedDeck.getNumCards(), result.getNumCards());

        // Verify interactions with dependencies
        verify(deckRepository, times(1)).save(any(Deck.class));
    }

    /**
     * Test case for retrieving all decks by user ID.
     */
    @Test
    public void testGetAllDecksByUserId() {
        // Prepare test data
        User user = new User();
        user.setId(1);

        List<Deck> decks = new ArrayList<>();
        decks.add(new Deck(1, "Deck 1", 0, user));
        decks.add(new Deck(2, "Deck 2", 0, user));

        // Mock the behavior of dependencies
        when(deckRepository.findAllByUserId(user.getId())).thenReturn(decks);

        // Perform test
        List<DeckDTO> result = deckService.getAllDecksByUserId(user.getId());

        // Assert result
        assertEquals(decks.size(), result.size());
        for (int i = 0; i < decks.size(); i++) {
            assertEquals(decks.get(i).getId(), result.get(i).getId());
            assertEquals(decks.get(i).getTitle(), result.get(i).getTitle());
            assertEquals(decks.get(i).getNumCards(), result.get(i).getNumCards());
            assertEquals(decks.get(i).getUser().getId(), user.getId());
        }

        // Verify interactions with dependencies
        verify(deckRepository, times(1)).findAllByUserId(user.getId());
    }

    /**
     * Test case for deleting a deck
     */
    @Test
    public void testDeleteDeck() {
        // Prepare test data
        Integer deckId = 1;
        Integer userId = 1;
        User user = new User();
        user.setId(userId);

        Deck deck = new Deck();
        deck.setId(deckId);
        deck.setUser(user);

        // Mock the behavior of dependencies
        when(deckRepository.findById(deck.getId())).thenReturn(Optional.of(deck));

        // Perform test
        DeleteResponse response = deckService.deleteDeck(userId, deckId);

        // Assert result
        assertEquals("Deck deleted.", response.getMessage());

        // Verify interactions with dependencies
        verify(deckRepository, times(1)).deleteById(deck.getId());
    }

    /**
     * Test deleting a deck that is not found
     */
    @Test
    public void testDeleteDeckNotFound() {
        // Prepare test data
        Integer deckId = 1;
        Integer userId = 1;

        // Mock the behavior of dependencies
        when(deckRepository.findById(deckId)).thenReturn(Optional.empty());

        // Perform the test, expecting NotFoundException
        assertThrows(NotFoundException.class, () -> {
            deckService.deleteDeck(userId, deckId);
        });
    }

    /**
     * Test deleting a deck when unauthorized
     */
    @Test
    public void testDeleteDeckUnauthorized() {
        // Prepare test data
        Integer deckId = 1;
        Integer userId = 1;
        Integer otherUserId = 2;

        User user = new User();
        user.setId(otherUserId);

        Deck deck = new Deck();
        deck.setId(deckId);
        deck.setUser(user);

        // Mock the behavior of dependencies
        when(deckRepository.findById(deckId)).thenReturn(Optional.of(deck));

        // Perform the test, expecting NotFoundException
        assertThrows(UnauthorizedUserException.class, () -> {
            deckService.deleteDeck(userId, deckId);
        });
    }

    /**
     * Test for updating deck
     */
    @Test
    public void testUpdateDeck() {
        // Prepare test data
        Integer deckId = 1;
        Integer userId = 1;

        User user = new User();
        user.setId(userId);

        DeckRequest request = new DeckRequest();
        request.setTitle("Updated Deck Title");
        request.setNumCards(1);

        Deck deck = new Deck();
        deck.setId(deckId);
        deck.setTitle("Old Deck Title");
        deck.setNumCards(0);
        deck.setUser(user);

        // Mock the behavior of dependencies
        when(deckRepository.findById(deckId)).thenReturn(Optional.of(deck));
        when(deckRepository.save(any(Deck.class))).thenReturn(deck);

        // Perform the test
        UpdateResponse response = deckService.updateDeck(userId, deckId, request);

        // Assert the result
        assertEquals("Deck updated.", response.getMessage());
        assertEquals(request.getTitle(), deck.getTitle());
        assertEquals(request.getNumCards(), deck.getNumCards());

        // Verify interactions with dependencies
        verify(deckRepository, times(1)).save(any(Deck.class));
    }
}

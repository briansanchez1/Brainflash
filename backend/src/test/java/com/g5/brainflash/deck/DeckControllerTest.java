package com.g5.brainflash.deck;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.g5.brainflash.common.responses.DeleteResponse;
import com.g5.brainflash.common.responses.UpdateResponse;
import com.g5.brainflash.user.Role;
import com.g5.brainflash.user.User;

/**
 * Contains unit tests for DeckController class.
 */
public class DeckControllerTest {
    @InjectMocks
    private DeckController deckController;

    @Mock
    private DeckService deckService;

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
        User user = User.builder()
            .email("email@test.com")
            .password("password")
            .role(Role.USER).build();

        DeckRequest request = new DeckRequest();
        request.setTitle("Test Deck");

        // Mock the behavior of dependencies
        when(deckService.saveDeck(any(), any())).thenReturn(new DeckDTO());

        // Perform test
        ResponseEntity<?> response = deckController.saveDeck(user, request);

        // Assert result
        assertEquals(HttpStatus.OK, response.getStatusCode());
    }

    /**
     * Test deleting deck
     */
    @Test
    public void testDeleteDeck() {
        // Prepare test data
        User user = User.builder()
            .email("test@email.com")
            .password("password")
            .role(Role.USER).build();

        // Mock the behavior of dependencies
        when(deckService.deleteDeck(anyInt(), anyInt())).thenReturn(new DeleteResponse("Deck deleted."));

        // Perform test
        ResponseEntity<?> response = deckController.deleteDeck(user, 1);

        // Assert result
        assertEquals(HttpStatus.OK, response.getStatusCode());
    }

    /**
     * Test updating deck
     */
    @Test
    public void testUpdateDeck() {
        // Prepare test data
        User user = User.builder()
            .email("test@email.com")
            .password("password")
            .role(Role.USER).build();

        DeckRequest request = new DeckRequest();
        request.setTitle("Updated Deck Title");

        // Mock the behavior of dependencies
        when(deckService.updateDeck(anyInt(), anyInt(), any())).thenReturn(new UpdateResponse("Deck updated."));

        // Perform test
        ResponseEntity<?> response = deckController.updateDeck(user, 1, request);

        // Assert result
        assertEquals(HttpStatus.OK, response.getStatusCode());
    }

    /**
     * Test getting all decks
     */
    @Test
    public void testGetAllDecks() {
        // Prepare test data
        User user = User.builder()
            .email("test@email.com")
            .password("password")
            .role(Role.USER).build();

        List<DeckDTO> decks = new ArrayList<>();
        decks.add(new DeckDTO());

        // Mock the behavior of dependencies
        when(deckService.getAllDecksByUserId(anyInt())).thenReturn(decks);

        // Perform test
        ResponseEntity<?> response = deckController.getAllDecks(user);

        // Assert result
        assertEquals(HttpStatus.OK, response.getStatusCode());
    }
}

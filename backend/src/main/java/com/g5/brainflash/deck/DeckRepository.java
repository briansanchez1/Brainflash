package com.g5.brainflash.deck;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Deck repository interface. Used to interact with the database for deck-related purposes.
 */
public interface DeckRepository extends JpaRepository<Deck, Integer>{
    List<Deck> findAllByUserId(Integer userId);
    Optional<Deck> findById(Integer id);
    void deleteById(Integer deckId);
}

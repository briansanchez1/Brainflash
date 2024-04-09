import React, { createContext, useState } from "react";

// Create the context
export const BrainflashContext = createContext();

// Create a provider component
export const BrainflashProvider = ({ children }) => {
  const [flashcards, setFlashcards] = useState([]);
  const [activeSession, setActiveSession] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [decks, setDecks] = useState([]);

  // Add a flashcard
  const addFlashcard = (flashcard) => {
    setFlashcards([...flashcards, flashcard]);
  };

  // Remove a flashcard
  const removeFlashcard = (id) => {
    setFlashcards(flashcards.filter((card) => card.id !== id));
  };

  const updateFlashcard = (flashcard) => {
    setFlashcards(
      flashcards.map((f) => {
        if (f.id === flashcard.id) {
          f = flashcard;
        }
        return f;
      })
    );
  };

  // Add a session
  const addSession = (session) => {
    setSessions([...sessions, session]);
  };

  // Remove a session
  const removeSession = (id) => {
    setSessions(sessions.filter((session) => session.id !== id));
  };

  // Update a session
  const updateSession = (session) => {
    setSessions(
      sessions.map((s) => {
        if (s.id === session.id) {
          s = session;
        }
        return s;
      })
    );
  };

  // Add a category
  const addCategory = (category) => {
    setCategories([...categories, category]);
  };

  // Remove a category
  const removeCategory = (id) => {
    setCategories(categories.filter((category) => category.id !== id));
  };

  // Update a category
  const updateCategory = (category) => {
    setCategories(
      categories.map((c) => {
        if (c.id === category.id) {
          c = category;
        }
        return c;
      })
    );
  };

  // Add a deck
  const addDeck = (deck) => {
    setDecks([...decks, deck]);
  };

  // Remove a deck
  const removeDeck = (id) => {
    setDecks(decks.filter((deck) => deck.id !== id));
  };

  // Update a deck
  const updateDeck = (deck) => {
    setDecks(
      decks.map((d) => {
        if (d.id === deck.id) {
          d = deck;
        }
        return d;
      })
    );
  };

  return (
    <BrainflashContext.Provider
      value={{
        flashcards,
        setFlashcards,
        addFlashcard,
        removeFlashcard,
        updateFlashcard,
        sessions,
        setSessions,
        addSession,
        removeSession,
        updateSession,
        categories,
        setCategories,
        addCategory,
        removeCategory,
        updateCategory,
        decks,
        setDecks,
        addDeck,
        removeDeck,
        updateDeck,
        activeSession,
        setActiveSession,
      }}
    >
      {children}
    </BrainflashContext.Provider>
  );
};

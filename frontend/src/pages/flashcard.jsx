import React, { useState, useEffect } from 'react';
import { apiFlashcards } from '../helpers/axios_helper';
import FlashcardFullCard from '../components/flashcard_full_card';

function FlashcardPage({ match }) {
  const [flashcard, setFlashcard] = useState("");

  useEffect(() => {
    apiFlashcards.getFlashcardById(match.params.id)
      .then(data => setFlashcard(data))
      .catch(err => console.error("Error fetching flashcard:", err));
  }, [match.params.id]);

  if (!flashcard) return <div>Loading...</div>;

  return (
    <FlashcardFullCard flashcard={flashcard} />
  );
}

export default FlashcardPage;
import * as React from "react";
import { TextField, Grid, Autocomplete, Typography } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import { apiDecks, apiCategories } from "../../helpers/axios_helper";

export default function FlashcardModalView({ flashcard, onFlashcardEdit }) {
  const [decks, setDecks] = useState([]);
  const [categories, setCategories] = useState(null);
  const [editedFlashcard, setEditedFlashcard] = useState({});
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [categoryId, setCategoryId] = useState(null);
  const [deckId, setDeckId] = useState(null);

  const handleFlashcardChange = (event) => {
    const { name, value } = event.target;
    editedFlashcard[name] = value;
    onFlashcardEdit(editedFlashcard);
  };

  useEffect(() => {
    // Fetch all decks when the component mounts
    apiDecks
      .getAllDecks()
      .then((response) => {
        setDecks(response.data); // Set the decks in state
      })
      .catch((error) => {
        console.error("Error fetching decks:", error);
      });

    // Fetch all categories when the component mounts
    apiCategories
      .getAllCategories()
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Error fetching decks:", error);
      });

    if (flashcard) {
      setEditedFlashcard({ ...flashcard });
      setAnswer(flashcard.answer);
      setQuestion(flashcard.question);
      setCategoryId(flashcard.categoryId);
      setDeckId(flashcard.deckId);
    }
  }, []);

  return (
    <Grid item xs={11} alignContent={"center"}>
      <TextField
        required
        fullWidth
        label="Enter Question"
        name="question"
        helperText="3-19 characters"
        value={question}
        onChange={(event) => {
          setQuestion(event.target.value);
          handleFlashcardChange(event);
        }}
        autoFocus
        inputProps={{ maxLength: 19, minLength: 3 }}
      />

      <TextField
        required
        fullWidth
        label="Enter Answer"
        value={answer}
        onChange={(event) => {
          setAnswer(event.target.value);
          handleFlashcardChange(event);
        }}
        name="answer"
        helperText="3-19 characters"
        sx={{ mt: 1 }}
      />

      {categories ? (
        <>
          <Autocomplete
            sx={{ mt: 1 }}
            disablePortal
            id="autocomplete-categories"
            options={categories}
            getOptionLabel={(category) => category.title}
            value={categories.find((cat) => cat.id === categoryId) || null}
            onChange={(event, newValue) => {
              const newCatId = newValue ? newValue.id : null;
              setCategoryId(newCatId);
              handleFlashcardChange({
                target: {
                  name: "categoryId",
                  value: newCatId,
                },
              });
            }}
            renderInput={(params) => (
              <TextField {...params} label="Categories" />
            )}
          />
        </>
      ) : (
        <Typography color="initial">Loading categories...</Typography>
      )}

      {decks ? (
        <>
          <Autocomplete
            sx={{ mt: 1 }}
            disablePortal
            id="autocomplete-decks"
            options={decks}
            getOptionLabel={(deck) => deck.title}
            value={decks.find((deck) => deck.id === deckId) || null}
            onChange={(event, newValue) => {
              const newDeckId = newValue ? newValue.id : null;
              setDeckId(newDeckId);
              handleFlashcardChange({
                target: {
                  name: "deckId",
                  value: newDeckId, // Use the newDeckId here instead of deckId
                },
              });
            }}
            renderInput={(params) => <TextField {...params} label="Decks" />}
          />
        </>
      ) : (
        <Typography color="initial">Loading decks...</Typography>
      )}
    </Grid>
  );
}

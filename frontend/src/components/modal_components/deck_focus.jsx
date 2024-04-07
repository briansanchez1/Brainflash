import React, { useEffect, useState } from "react";

import { TextField, Grid } from "@mui/material";

export default function DeckView({ deck, onDeckEdit }) {
  const [title, setTitle] = useState("");
  const [editedDeck, setEditedDeck] = useState({});

  const handleDeckChange = (event) => {
    const { name, value } = event.target;
    editedDeck[name] = value;
    onDeckEdit(editedDeck);
  };

  useEffect(() => {
    if (deck) {
      setEditedDeck({ ...deck });
      setTitle(deck.title);
    }
  }, []);

  return (
    <Grid item xs={11} alignContent={"center"}>
      <TextField
        required
        fullWidth
        label="Title"
        name="title"
        autoFocus
        value={title}
        onChange={(event) => {
          setTitle(event.target.value);
          handleDeckChange(event);
        }}
        inputProps={{ minLength: 3, maxLength: 25 }}
        helperText={"3-25 characters."}
      />
    </Grid>
  );
}

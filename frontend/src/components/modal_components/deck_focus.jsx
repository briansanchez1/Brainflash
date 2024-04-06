import * as React from "react";
import { TextField, Grid } from "@mui/material";

export default function DeckView({ deck, onUpdate }) {
  const handleFieldChange = (event) => {
    onUpdate({
      ...deck,
      title: event.target.value,
    });
  };
  return (
    <Grid item xs={11} alignContent={"center"}>
      <TextField
        required
        fullWidth
        label="Title"
        name="Title"
        autoFocus
        defaultValue={deck ? deck.title : ""}
        onChange={onUpdate && handleFieldChange}
        inputProps={{ minLength: 3, maxLength: 25 }}
        helperText={"3-25 characters."}
      />
    </Grid>
  );
}

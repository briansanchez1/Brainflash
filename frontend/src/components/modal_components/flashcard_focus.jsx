import * as React from "react";

import { TextField, Grid, Select, MenuItem } from "@mui/material";

export default function FlashcardView() {
  return (
    <Grid item xs={11} alignContent={"center"}>
      <TextField
        required
        fullWidth
        label="Enter Question"
        name="Question"
        autoFocus
      />

      <TextField
        required
        fullWidth
        label="Enter Answer"
        name="Answer"
        sx={{ mt: 3 }}
      />

      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        label="deck"
        required
        sx={{ width: 340, mt: 3 }}
      >
        <MenuItem value={"None"}>None</MenuItem>

        <MenuItem value={"deck 1"}>Deck 1</MenuItem>
      </Select>
    </Grid>
  );
}

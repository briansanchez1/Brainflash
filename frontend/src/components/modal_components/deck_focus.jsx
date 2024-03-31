import * as React from "react";
import { TextField, Grid } from "@mui/material";

export default function DeckView() {
  return (
    <Grid item xs={11} alignContent={"center"}>
      <TextField required fullWidth label="Deck" name="Deck" autoFocus />
    </Grid>
  );
}
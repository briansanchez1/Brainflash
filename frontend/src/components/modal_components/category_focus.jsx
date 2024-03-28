import * as React from "react";

import { TextField, Grid } from "@mui/material";

export default function CategoryView() {
  return (
    <Grid item xs={11} alignContent={"center"}>
      <TextField
        required
        fullWidth
        label="Category"
        name="Category"
        autoFocus
      />
    </Grid>
  );
}

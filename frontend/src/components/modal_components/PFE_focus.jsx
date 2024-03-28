import * as React from "react";
import { TextField, Grid } from "@mui/material";

export default function PFEView() {
  return (
    <Grid item xs={11} alignContent={"center"}>
      <TextField required fullWidth label="PFE" name="PFE" autoFocus />
    </Grid>
  );
}

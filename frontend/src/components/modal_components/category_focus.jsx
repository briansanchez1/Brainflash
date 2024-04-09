import React, { useEffect, useState } from "react";

import { TextField, Grid, ThemeProvider, createTheme } from "@mui/material";

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: "#E6A4B4",
    },
  },
});
export default function CategoryView({ category, onCategoryEdit }) {
  const [title, setTitle] = useState("");
  const [editedCategory, setEditedCategory] = useState({});

  const handleCategoryChange = (event) => {
    const { name, value } = event.target;
    editedCategory[name] = value;
    onCategoryEdit(editedCategory);
  };

  useEffect(() => {
    if (category) {
      setEditedCategory({ ...category });
      setTitle(category.title);
    }
  }, []);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid item xs={11} alignContent={"center"}>
        <TextField
          required
          fullWidth
          label="Title"
          name="title"
          autoFocus
          inputProps={{ minLength: 3, maxLength: 25 }}
          helperText={"3-25 characters."}
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
            handleCategoryChange(event);
          }}
        />
      </Grid>
    </ThemeProvider>
  );
}

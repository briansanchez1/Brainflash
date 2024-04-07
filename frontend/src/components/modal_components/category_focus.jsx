import React, { useEffect, useState } from "react";

import { TextField, Grid } from "@mui/material";

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
  );
}

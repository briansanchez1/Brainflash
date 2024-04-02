import React, { useState } from "react";
import { Grid, Typography, Container, TextField, Box } from "@mui/material";
import CategoryCard from "../components/category_card";

const categoriesData = [
  { id: 1, name: "a", flashcard_amount: 5 },
  { id: 2, name: "Chemistry", flashcard_amount: 5 },
  { id: 3, name: "Software Engineering", flashcard_amount: 5 },
  { id: 4, name: "Category 4", flashcard_amount: 5 },
  { id: 5, name: "Category 5zzzzzzzzs", flashcard_amount: 5 },
  { id: 6, name: "Category 6", flashcard_amount: 5 },
  { id: 7, name: "Category 7", flashcard_amount: 5 },
];

const CategoriesGrid = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredCategories = categoriesData.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container>
      <Typography sx={{ my: 4, textAlign: "left" }} variant="h4">
        Categories
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <TextField
          label="Search"
          variant="outlined"
          sx={{
            mb: 4,
            width: {
              xs: "100%",
              sm: "100%",
              md: "100%",
              lg: "100%",
              xl: "25%",
            },
          }}
          onChange={handleSearchChange}
        />
      </Box>
      <Grid container spacing={2} sx={{ pb: 4 }}>
        {filteredCategories.length > 0 ? (
          filteredCategories.map((category) => (
            <Grid item key={category.id} xs={12} sm={6} md={4} lg={3} xl={3}>
              <CategoryCard category={category} />
            </Grid>
          ))
        ) : (
          <Typography
            sx={{
              width: {
                xs: "100%",
              },
            }}
            variant="h8"
          >
            No categories found.
          </Typography>
        )}
      </Grid>
    </Container>
  );
};

export default CategoriesGrid;

import React, { useState, useEffect } from "react";
import { Grid, Typography, Container, TextField, Box } from "@mui/material";
import CategoryCard from "../components/category_card";
import { apiCategories } from "../helpers/axios_helper";

const CategoriesGrid = () => {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Fetch all categories when the component mounts
    apiCategories
      .getAllCategories()
      .then((response) => {
        setCategories(response.data); // Set the categories in state
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  // Handles search change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Updates filtered categories
  const filteredCategories = categories.filter((category) =>
    category.title.toLowerCase().includes(searchTerm.toLowerCase())
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

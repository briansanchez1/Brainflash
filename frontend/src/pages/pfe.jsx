import React, { useState, useEffect } from "react";
import { Grid, Typography, Container, TextField, Box } from "@mui/material";
import CategoryCard from "../components/category_card";
import { apiPFE } from "../helpers/axios_helper";

const Pfe = () => {
  const [PFE, setPFE] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Fetch all pfe when the component mounts
    apiPFE
      .getAllPFE()
      .then((response) => {
        setPFE(response.data); // Set the pfe in state
      })
      .catch((error) => {
        console.error("Error fetching sessions:", error);
      });
  }, []);

  // Handles search change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Updates filtered pfe
  const filteredPfe = PFE.filter((pfe) =>
    pfe.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container>
      <Typography sx={{ my: 4, textAlign: "left" }} variant="h4">
        Prepare For Exam Sessions
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
        {filteredPfe.length > 0 ? (
          filteredPfe.map((pfe) => (
            <Grid item key={pfe.id} xs={12} sm={6} md={4} lg={3} xl={3}>
              <CategoryCard category={pfe} />
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
            No Sessions found.
          </Typography>
        )}
      </Grid>
    </Container>
  );
};

export default Pfe;

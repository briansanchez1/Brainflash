import React, { useState, useEffect } from "react";
import {
  createTheme,
  ThemeProvider,
  Typography,
  Stack,
  Button,
  Container,
  Card,
} from "@mui/material";
import Navbar from "../components/navbar";
import CategoryCard from "../components/card";
import Grid from "@mui/material/Unstable_Grid2";
import NewModal from "../components/modal";

const defaultTheme = createTheme();

// testing values
const categoriesData = [
  { id: 1, name: "a", flashcard_amount: 5 },
  { id: 2, name: "Chemistry", flashcard_amount: 5 },
  { id: 3, name: "Software Engineering", flashcard_amount: 5 },
  { id: 4, name: "Category 4", flashcard_amount: 5 },
  { id: 5, name: "Category 5zzzzzzzzs", flashcard_amount: 5 },
  { id: 6, name: "Category 6", flashcard_amount: 5 },
  { id: 7, name: "Category 7", flashcard_amount: 5 },
];

const Dashboard = () => {
  // State to track loading
  const [displayedCards, setDisplayedCards] = useState([]);

  // original cards used to determine if a helper card should be shown or not
  const [originalCards, setOriginalCards] = useState([]);



  const loadExtraCard = () => {
    if (originalCards.length > 3) {
      setDisplayedCards(originalCards.reverse().slice(0, 3));
    } else {
      setDisplayedCards(originalCards.reverse());
    }
  };


  useEffect(() => {
    setOriginalCards(categoriesData);
  }, []);

  useEffect(() => {
    loadExtraCard();
  }, [originalCards]);

 
  return (
    <ThemeProvider theme={defaultTheme}>
      <Navbar />
      <Container>
        <Stack>
          {/* Categories */}
          <Typography
            variant="h4"
            mt={"56px"}
            textAlign={"left"}
            sx={{ fontSize: { xs: 20, md: 25, lg: 27 } }}
          >
            Your Categories
            {/* temporary solution */}
            <Button
              sx={{
                ml: 2,
              }}
            >
              <NewModal focus="category" />
            </Button>
          </Typography>

          <Grid
            container
            direction={"row"}
            sx={{
              gap: 1,
            }}
          >
            {displayedCards.length > 0 ? (
              displayedCards.map((category) => (
                <Grid
                  item
                  key={category.id}
                  xs={12}
                  sm={12}
                  md={3} // ideally 4 would be bettwe so it is 3 on top and view all on bottom
                  lg={3}
                  xl={3}
                 
                >
                  <CategoryCard category={category}  />
                </Grid>
              ))
            ) : (
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <CategoryCard
                  category={{ name: "No Categories Found. Click to Create." }}
                />
              </Grid>
            )}

            {originalCards.length > 3 && (
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <CategoryCard
                  category={{ name: "Click to View All Categories" }}
                />
              </Grid>
            )}
          </Grid>


           {/* PFE / Review Boilerplate */}
           <Typography
            variant="h4"
            mt={"56px"}
            textAlign={"left"}
            sx={{ fontSize: { xs: 20, md: 25, lg: 27 } }}
          >
            Review Sessions
            {/* temporary solution */}
            <Button
              sx={{
                ml: 2,
              }}
            >
              <NewModal focus="review" />
            </Button>
          </Typography>

          <Grid
            container
            direction={"row"}
            sx={{
              gap: 1,
            }}
          >
            {displayedCards.length > 0 ? (
              displayedCards.map((category) => (
                <Grid
                  item
                  key={category.id}
                  xs={12}
                  sm={12}
                  md={3} // ideally 4 would be bettwe so it is 3 on top and view all on bottom
                  lg={3}
                  xl={3}
                 
                >
                  <CategoryCard category={category}  />
                </Grid>
              ))
            ) : (
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <CategoryCard
                  category={{ name: "No Review Sessions Found. Click to Create." }}
                />
              </Grid>
            )}

            {originalCards.length > 3 && (
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <CategoryCard
                  category={{ name: "Click to View All Review Sessions" }}
                />
              </Grid>
            )}
          </Grid>

          {/* Review Sessions */}
        </Stack>
      </Container>
    </ThemeProvider>
  );
};

export default Dashboard;

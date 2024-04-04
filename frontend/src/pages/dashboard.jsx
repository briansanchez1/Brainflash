import React, { useState, useEffect } from "react";
import {
  createTheme,
  ThemeProvider,
  Typography,
  Stack,
  Button,
  Container,
} from "@mui/material";
import CategoryCard from "../components/category_card";
import Grid from "@mui/material/Unstable_Grid2";
import NewModal from "../components/modal";
import { apiCategories } from "../helpers/axios_helper";

const defaultTheme = createTheme();

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
    loadExtraCard();
    // Fetch all categories when the component mounts
    apiCategories
      .getAllCategories()
      .then((response) => {
        setOriginalCards(response.data); // Set the categories in state
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  useEffect(() => {
    loadExtraCard();
  }, []);

  return (
    <ThemeProvider theme={defaultTheme}>
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

          <Grid container direction={"row"} spacing={1}>
            {displayedCards.length > 0 ? (
              displayedCards.map((category) => (
                <Grid
                  item
                  key={category.id}
                  xs={12}
                  sm={12}
                  md={4} // ideally 4 would be bettwe so it is 3 on top and view all on bottom
                  lg={4}
                  xl={4}
                >
                  <CategoryCard category={category} />
                </Grid>
              ))
            ) : (
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <CategoryCard
                  category={{ title: "No Categories Found. Click to Create." }}
                />
              </Grid>
            )}

            {originalCards.length > 3 && (
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <CategoryCard
                  category={{ title: "Click to View All Categories" }}
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

          <Grid container direction={"row"} spacing={1}>
            {displayedCards.length > 0 ? (
              displayedCards.map((category) => (
                <Grid
                  item
                  key={category.id}
                  xs={12}
                  sm={12}
                  md={4} // ideally 4 would be bettwe so it is 3 on top and view all on bottom
                  lg={4}
                  xl={4}
                >
                  <CategoryCard category={category} />
                </Grid>
              ))
            ) : (
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <CategoryCard
                  category={{
                    title: "No Review Sessions Found. Click to Create.",
                  }}
                />
              </Grid>
            )}

            {originalCards.length > 3 && (
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <CategoryCard
                  category={{ title: "Click to View All Review Sessions" }}
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

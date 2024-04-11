import React, { useState, useEffect } from "react";
import {
  createTheme,
  ThemeProvider,
  Typography,
  Stack,
  Container,
  Box,
} from "@mui/material";
import ActionCard from "../components/action_card";
import ExtraCard from "../components/extra_card";
import Grid from "@mui/material/Unstable_Grid2";
import NewModal from "../components/modal";
import { apiCategories, apiPFESessions } from "../helpers/axios_helper";
import { useNavigate } from "react-router-dom";

const defaultTheme = createTheme();

// helper function to format date
const formatDate = (dateString) => {
  const [year, month, day] = dateString.split("-");
  return `${month}/${day}/${year}`;
};

const Dashboard = () => {
  // States to track loading
  const [categoryCards, setCategoryCards] = useState([]);
  const [categoryAmt, setCategoryAmt] = useState(0);
  // States for pfe Info
  const [pfeCards, setPFECards] = useState([]);
  const [pfeAmt, setPfeAmt] = useState(0);
  // Used to navigate pages
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Dashboard";
    apiCategories
      .getAllCategories()
      .then((response) => {
        setCategoryCards(response.data.reverse().slice(0, 3));
        setCategoryAmt(response.data.length);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });

    apiPFESessions
      .getAllSessions()
      .then((response) => {
        setPFECards(response.data.reverse().slice(0, 3));
        setPfeAmt(response.data.length);
      })
      .catch((error) => {
        console.error("Error fetching PFE Sessions:", error);
      });
  }, []);

  // Handle click event, for example, navigate to a category detail page
  const handleCardClickCategory = (categoryId) => {
    navigate(`/flashcards/category/${categoryId}`);
  };

  // Handle click event, for example, navigate to a category detail page
  const handleCardClickDeck = (deckId) => {
    navigate(`/flashcards/deck/${deckId}`);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container>
        <Stack>
          {/* Categories */}

          <Stack
            direction={"row"}
            mt={"56px"}
            mb={"10px"}
            alignItems={"center"}
          >
            <Typography
              variant="h4"
              textAlign={"left"}
              sx={{ fontSize: { xs: 20, md: 25, lg: 27 } }}
            >
              Your Categories
            </Typography>
            <Box ml={"10px"}>
              <NewModal focus="category" />
            </Box>
          </Stack>

          <Grid container direction={"row"} spacing={1}>
            {categoryCards.length > 0 ? (
              categoryCards.map((category) => (
                <Grid
                  item
                  key={category.id}
                  xs={12}
                  sm={12}
                  md={4}
                  lg={4}
                  xl={4}
                >
                  <ActionCard
                    content={
                      <>
                        <Typography variant="h5" sx={{ fontWeight: 600 }}>
                          {category.title}
                        </Typography>

                        <Typography variant="h6" sx={{ fontSize: 18 }}>
                          {"Number of cards: " + category.cardCount}
                        </Typography>
                      </>
                    }
                    onClick={() => handleCardClickCategory(category.id)}
                  />
                </Grid>
              ))
            ) : (
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <ExtraCard
                  extra={{ title: "No Categories Found. Click to Create." }}
                />
              </Grid>
            )}

            {categoryAmt > 3 && (
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <ExtraCard
                  navTo={"/categories"}
                  extra={{ title: "Click to View All Categories" }}
                />
              </Grid>
            )}
          </Grid>

          {/* PFE / Review  */}
          <Stack
            direction={"row"}
            mt={{ xs: "50px", md: "150px" }}
            mb={"10px"}
            alignItems={"center"}
          >
            <Typography
              variant="h4"
              textAlign={"left"}
              sx={{ fontSize: { xs: 20, md: 25, lg: 27 } }}
            >
              Your Review Sessions
            </Typography>
            <Box ml={"10px"}>
              <NewModal focus="review" />
            </Box>
          </Stack>

          <Grid container direction={"row"} spacing={1}>
            {pfeCards.length > 0 ? (
              pfeCards.map((pfe) => (
                <Grid item key={pfe.id} xs={12} sm={12} md={4} lg={4} xl={4}>
                  <ActionCard
                    content={
                      <>
                        <Typography variant="h5" sx={{ fontWeight: 600 }}>
                          {" "}
                          {pfe.title}
                        </Typography>
                        <Typography variant="h6" sx={{ fontSize: 18 }}>
                          {"Start Date: " + formatDate(pfe.startDate)}
                        </Typography>
                        <Typography variant="h6" sx={{ fontSize: 18 }}>
                          {"End Date: " + formatDate(pfe.endDate)}
                        </Typography>
                      </>
                    }
                    onClick={() =>
                      pfe.categoryId != null
                        ? handleCardClickCategory(pfe.categoryId)
                        : handleCardClickDeck(pfe.deckId)
                    }
                  />
                </Grid>
              ))
            ) : (
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <ExtraCard
                  extra={{
                    title: "No Sessions Found. Click the plus to create.",
                  }}
                />
              </Grid>
            )}

            {pfeAmt > 3 && (
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <ExtraCard
                  navTo={"/pfe"}
                  extra={{ title: "Click to View All Sessions" }}
                />
              </Grid>
            )}
          </Grid>
        </Stack>
      </Container>
    </ThemeProvider>
  );
};

export default Dashboard;

import React, { useState, useEffect, useContext } from "react";
import {
  createTheme,
  ThemeProvider,
  Typography,
  Stack,
  Container,
  Box,
  Grid,
} from "@mui/material";
import ActionCard from "../components/action_card";
import ExtraCard from "../components/extra_card";
import NewModal from "../components/modal";
import { BrainflashContext } from "../components/context/brainflash_context";
import { apiCategories, apiPFESessions } from "../helpers/axios_helper";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";

const defaultTheme = createTheme();

// helper function to format date
const formatDate = (dateString) => {
  const [year, month, day] = dateString.split("-");
  return `${month}/${day}/${year}`;
};

const Dashboard = () => {
  // Used to navigate pages
  const navigate = useNavigate();
  // context of items on the dashboard
  const { categories, setCategories, sessions, setSessions } =
    useContext(BrainflashContext);
  // loading state
  const [isLoading, setIsLoading] = useState(true);

  // Handle click event, for example, navigate to a category detail page
  const handleCardClickCategory = (categoryId) => {
    navigate(`/flashcards/category/${categoryId}`);
  };

  // Handle click event, for example, navigate to a category detail page
  const handleCardClickDeck = (deckId) => {
    navigate(`/flashcards/deck/${deckId}`);
  };

  useEffect(() => {
    document.title = "Dashboard";

    // get all categories
    apiCategories
      .getAllCategories()
      .then((response) => {
        setCategories(
          response.data.map((c) => {
            return c;
          })
        );
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
    // get all pfe sessions
    apiPFESessions
      .getAllSessions()
      .then((response) => {
        setSessions(
          response.data.map((s) => {
            return s;
          })
        );
      })
      .catch((error) => {
        console.error("Error fetching sessions:", error);
      });
    setIsLoading(false);
  }, []);

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
            {categories.length > 0 ? (
              categories
                .slice(-3)
                .reverse()
                .map((category) => (
                  <Grid
                    item
                    key={category.id}
                    xs={12}
                    sm={12}
                    md={4}
                    lg={4}
                    xl={4}
                  >
                    {isLoading ? (
                      <Box sx={{ display: "flex" }}>
                        <CircularProgress />
                      </Box>
                    ) : null}
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
                  extra={{
                    title: "No Categories Found. Click the plus to create.",
                  }}
                />
              </Grid>
            )}

            {categories.length > 3 && (
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
            {sessions.length > 0 ? (
              sessions
                .slice(-3)
                .reverse()
                .map((session) => (
                  <Grid
                    item
                    key={session.id}
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
                            {" "}
                            {session.title}
                          </Typography>
                          <Typography variant="h6" sx={{ fontSize: 18 }}>
                            {"Start Date: " + formatDate(session.startDate)}
                          </Typography>
                          <Typography variant="h6" sx={{ fontSize: 18 }}>
                            {"End Date: " + formatDate(session.endDate)}
                          </Typography>
                        </>
                      }
                      onClick={() =>
                        session.categoryId != null
                          ? handleCardClickCategory(session.categoryId)
                          : handleCardClickDeck(session.deckId)
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

            {sessions.length > 3 && (
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

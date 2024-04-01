import * as React from "react";
import {
  createTheme,
  ThemeProvider,
  Typography,
  Stack,
  Button,
} from "@mui/material";
import Categories from "../components/card";
import ReviewSessions from "../components/card";
import Grid from "@mui/material/Unstable_Grid2";
import NewModal from "../components/modal";

const defaultTheme = createTheme();
const cards = ["card1", 2, 3, 4, 5, 6, 7, 8];
export default function forgotpassword() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Stack>
        {/* Categories */}
        <Typography
          variant="h4"
          mt={"56px"}
          ml={2}
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
          mt={5}
          mx={3}
          py={2}
          container
          direction={"row"}
          wrap="nowrap"
          sx={{
            overflowX: "auto",
            display: "flex",
            gap: "10px",
            maxWidth: "100%",
          }}
        >
          {cards.map((cards) => (
            <Categories title={"Lorem Ipsum"} />
          ))}
        </Grid>

        {/* Review Sessions */}
        <Typography
          variant="h4"
          mt={"56px"}
          ml={2}
          textAlign={"left"}
          sx={{ fontSize: { xs: 20, md: 25, lg: 27 } }}
        >
          Your Review Sessions
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
          mt={5}
          mx={3}
          py={2}
          container
          direction={"row"}
          wrap="nowrap"
          sx={{
            overflowX: "auto",
            display: "flex",
            gap: "10px",
            maxWidth: "100%",
          }}
        >
          {cards.map((cards) => (
            <ReviewSessions title={"Lorem Ipsum"} />
          ))}
        </Grid>
      </Stack>
    </ThemeProvider>
  );
}

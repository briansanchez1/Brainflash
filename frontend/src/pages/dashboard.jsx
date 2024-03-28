import * as React from "react";
import {
  createTheme,
  ThemeProvider,
  Typography,
  Stack,
  Button,
  IconButton,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import Navbar from "../components/navbar";
import Categories from "../components/card";
import ReviewSessions from "../components/card";
import Grid from "@mui/material/Unstable_Grid2";
import NewModal from "../components/modal";

const defaultTheme = createTheme();
const categoriereire = [1, 2, 3, 4, 5, 6, 6, 6, 6, 6, 6, 2, 2, 2, 2, 2, 2, 2];

export default function forgotpassword() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Navbar />
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
          <IconButton
            sx={{
              ml: 2,
              bgcolor: "#BDBDBD",
              color: "#fff",
              width: 36,
              height: 36,
            }}
          >
            <NewModal focus="category" />
          </IconButton>
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
          {categoriereire.map((categoriereire) => (
            <Categories title={"cat"} />
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
          Your Review Sessions{" "}
          <IconButton
            sx={{
              mr: 2,
              bgcolor: "#BDBDBD",
              color: "",
              width: 36,
              height: 36,
            }}
          >
            <NewModal focus="review" />
          </IconButton>
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
          {categoriereire.map((categoriereire) => (
            <ReviewSessions title={"abcdefghijklmnopqrstuv"} />
          ))}
        </Grid>
      </Stack>
    </ThemeProvider>
  );
}

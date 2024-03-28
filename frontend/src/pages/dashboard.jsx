import * as React from "react";
import {
  createTheme,
  ThemeProvider,
  Typography,
  Stack,
  Button,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import Navbar from "../components/navbar";
import Categories from "../components/card";
import ReviewSessions from "../components/card";
import Grid from "@mui/material/Unstable_Grid2";

const defaultTheme = createTheme();
const categoriereire = [1, 2, 3, 4, 5, 6, 6, 6, 6, 6, 6, 2, 2, 2, 2, 2, 2, 2];

export default function forgotpassword() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Navbar />
      <Stack>
        {/* Categories */}
        <Typography variant="h4" mt={"56px"} ml={2} textAlign={"left"}>
          Your Categories{" "}
          <Button
            variant="contained"
            sx={{
              bgcolor: "#fff",
              color: "#000",
              borderRadius: 5,
              maxwidth: "1",
              fontWeight: 700,
            }}
          >
            <Add />
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
          {categoriereire.map((categoriereire) => (
            <Categories title={"cat"} />
          ))}
        </Grid>

        {/* Review Sessions */}
        <Typography variant="h4" mt={"56px"} ml={2} textAlign={"left"}>
          Your Review Sessions{" "}
          <Button
            variant="contained"
            sx={{
              bgcolor: "#fff",
              color: "#000",
              borderRadius: 5,
              maxwidth: "1",
              fontWeight: 700,
            }}
          >
            <Add />
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
          {categoriereire.map((categoriereire) => (
            <ReviewSessions title={"abcdefghijklmnopqrstuv"} />
          ))}
        </Grid>
      </Stack>
    </ThemeProvider>
  );
}

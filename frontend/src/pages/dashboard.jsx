import * as React from "react";
import {
  createTheme,
  ThemeProvider,
  Typography,
  Stack,
  Button,
} from "@mui/material";
import Navbar from "../components/navbar";
import Categories from "../components/card";
import ReviewSessions from "../components/card";
import Grid from "@mui/material/Unstable_Grid2";
import NewModal from "../components/modal";
import { useNavigate } from "react-router-dom";
import { verifyAuth, } from "../helpers/axios_helper";

const defaultTheme = createTheme();
const cards = ["1", "1", "1", "1", "1", "1"]; // testing values

const Dashboard = () => {
  const navigate = useNavigate();

  const redirectUser = async () => {
    const authenticated = await verifyAuth();
    if (!authenticated) {
      navigate("/login");
    }
  };

  React.useEffect(() => {
    redirectUser();
  }); // Run once on component mount
  return (
    <div onLoad={redirectUser}>
      <ThemeProvider theme={defaultTheme}>
        <Navbar />
        <Stack>
          <Button  sx={{bgcolor: "gray", height: "40px", width: "40px"}}></Button>
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
              <Categories title={cards} />
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
    </div>
  );
};
export default Dashboard;

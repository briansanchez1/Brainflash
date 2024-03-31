import React, { useState } from "react";
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
import { verifyAuth } from "../helpers/axios_helper";

const defaultTheme = createTheme();

const Dashboard = () => {
  // State to track loading
  const [isLoading, setIsLoading] = useState(true);

  // used to switch between pages
  const navigate = useNavigate();

  //test values
  const cards = ["1", "1", "1", "1", "1", "1", "1"];

  // check if the user is valid or not, and redirect the user to the dashboard or do nothing
  const redirectUser = async () => {
    const authenticated = await verifyAuth();
    if (!authenticated) {
      navigate("/login");
    } else {
      setIsLoading(false);
    }
  };

  // once component is mounted, will run redirect user
  React.useEffect(() => {
    redirectUser();
  }, [isLoading]);

  return (
    <div>
      {isLoading ? null : (
        <div>
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
        </div>
      )}
    </div>
  );
};

export default Dashboard;

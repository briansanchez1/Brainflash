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
import { apiCategories, apiPFE } from "../helpers/axios_helper";

const defaultTheme = createTheme();

const Dashboard = () => {
  // State to track loading
  const [categoryCards, setCategoryCards] = useState([]);
  const [categoryAmt, setCategoryAmt] = useState(0);

  const [pfeCards, setPFECards] = useState([]);
  const [pfeAmt, setPfeAmt] = useState(0);

  useEffect(() => {
    apiCategories
      .getAllCategories()
      .then((response) => {
        setCategoryCards(response.data.reverse().slice(0, 3));
        setCategoryAmt(response.data.length);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });

    apiPFE
      .getAllPFE()
      .then((response) => {
        setPFECards(response.data.reverse().slice(0, 3));
        setPfeAmt(response.data.length);
      })
      .catch((error) => {
        console.error("Error fetching PFE Sessions:", error);
      });
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

            {categoryAmt > 3 && (
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <CategoryCard
                  category={{ title: "Click to View All Categories" }}
                />
              </Grid>
            )}
          </Grid>

          {/* PFE / Review  */}
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
            {pfeCards.length > 0 ? (
              pfeCards.map((pfe) => (
                <Grid item key={pfe.id} xs={12} sm={12} md={4} lg={4} xl={4}>
                  <CategoryCard category={pfe} />
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

            {pfeAmt > 3 ? (
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <CategoryCard
                  category={{ title: "Click to View All Review Sessions" }}
                />
              </Grid>
            ) : null}
          </Grid>
        </Stack>
      </Container>
    </ThemeProvider>
  );
};

export default Dashboard;

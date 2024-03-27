import * as React from "react";
import {
  createTheme,
  ThemeProvider,
  Container,
  Avatar,
  Button,
  Box, TextField
} from "@mui/material";
import logo from "../assets/logo.png";
import Navbar from "../components/navbar"

const defaultTheme = createTheme();

export default function forgotpassword() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Navbar/>
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          background: "#fff",
          borderRadius: 10,
        }}
      >
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar
            alt="Brainflash"
            src={logo}
            variant="square"
            sx={{ width: 128, height: 128, m: 2 }}
          />

          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              fullWidth
              disabled={true}
              id="name"
              label="DASHBOARD ---- STILL WIP"
              
              name="name"
              autoComplete="name"
              autoFocus
            />
            <Button
              href="/login"
              type="submit"
              className="submit"
              variant="contained"
              sx={{
                m: "auto",
                mb: 2,
                bgcolor: "pink",
                color: "black",
                borderRadius: 5,
                fontFamily: "Trebuchet MS",
                fontSize: 30,
                fontWeight: 700,
                ":hover": {
                  bgcolor: "pink",
                  color: "black",
                  transition: "0s",
                },
              }}
            >
              {"Go To Login"}
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

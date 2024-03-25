import React, { useState } from "react";
import axios from "axios";
import {
  createTheme,
  ThemeProvider,
  Container,
  Avatar,
  Button,
  TextField,
  Link,
  Grid,
  Box,
} from "@mui/material";
import logo from "../assets/logo.png";
import { pink } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: pink[100],
    },
  },
});

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:8080/api/v1/auth/authenticate", {
        email: formData.email,
        password: formData.password,
      })
      .then(function (response) {
        navigate("/");
      })
      .catch(function (error) {
        setMessage("Email or password is incorrect.");
      });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
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
              required
              value={formData.email}
              onChange={handleChange}
              fullWidth
              autoFocus
              id="email"
              type="email"
              label="Email Address"
              name="email"
              autoComplete="email"
            />

            <TextField
              margin="normal"
              required
              value={formData.password}
              onChange={handleChange}
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            {message && (
              <Box sx={{ textAlign: "center", m: 2, fontWeight: 800 }}>
                {message}
              </Box>
            )}
            <Grid
              container
              justifyContent={"space-between"}
              sx={{ padding: 2 }}
            >
              <Grid item>
                <Link
                  href="/forgot-password"
                  variant="body2"
                  sx={{
                    cursor: "pointer",
                    textDecoration: "none",
                    color: "#797979",
                    fontSize: 17,
                    ":hover": {
                      textDecoration: "underline",
                      color: "black",
                      transition: "0.1s",
                    },
                  }}
                >
                  {"Forgot password?"}
                </Link>
              </Grid>

              <Grid item>
                <Link
                  href="/register"
                  variant="body2"
                  sx={{
                    cursor: "pointer",
                    textDecoration: "none",
                    color: "#797979",
                    fontSize: 17,

                    ":hover": {
                      textDecoration: "underline",
                      color: "black",
                      transition: "0.1s",
                    },
                  }}
                >
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>

            <Button
              onClick={handleSubmit}
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
              Log in
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Login;
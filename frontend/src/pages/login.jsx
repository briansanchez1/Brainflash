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
import {  setAuthHeader, verifyAuth } from "../helpers/axios_helper";

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: pink[100],
    },
  },
});

const Login = () => {
  // error message (if one exists)
  const [message, setMessage] = useState("");

  // information that the user enters
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // used to switch between pages
  const navigate = useNavigate();

  // handles changes to the text in the text boxes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

    /*
  handles submition; sends a post request to the endpoint to register. is returned the
  JWT token for authorization.This can probably be added to a separate file with all
  of the reqests for the sake of cleaning things up, or added to the 
  axios helper file for the same reason. 
  */
  const handleSubmit = async (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:8080/api/v1/auth/authenticate", {
        email: formData.email,
        password: formData.password,
      })
      .then(function (response) {
        setAuthHeader(response.data.token);
        navigate("/");
      })
      .catch(function (error) {
        setMessage("Email or password is incorrect.");
      });
  };

  //  check if the user is valid or not, and redirect the to the dashboard or do nothing
  const redirectUser = async () => {
    const authenticated = await verifyAuth();
    if (authenticated) {
      navigate("/");
    }
  };

  // once component is mounted, will run redirect user
  React.useEffect(() => {
    redirectUser();
  });

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container
        component="main"
        onLoad={redirectUser}
        sx={{
          background: "#fff",
          borderRadius: 10,
          width: { xs: 300, sm: 350, md: 450, lg: 550 },
          height: { xs: 500, lg: 475 },
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
                    fontSize: { xs: 12, sm: 15, md: 17, lg: 18 },

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
                    fontSize: { xs: 12, sm: 15, md: 17, lg: 18 },

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
                fontSize: { xs: 17, lg: 18 },
                width: { xs: 200, sm: 275, md: 300, lg: 350 },
                height: { xs: 40, md: 50 },
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

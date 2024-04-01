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
import { pink } from "@mui/material/colors";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { setAuthHeader } from "../helpers/axios_helper";

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: pink[100],
    },
  },
});

const Register = () => {
  // error message (if one exists)
  const [message, setMessage] = useState("");
  // information that the user enters
  const [formData, setFormData] = useState({
    name: "",
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
    setMessage("");
    axios
      .post("http://localhost:8080/api/v1/auth/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      })
      .then(function (response) {
        setAuthHeader(response.data.token);
        navigate("/");
      })
      .catch(function (error) {
        setAuthHeader("");
        console.log(error);
        setMessage(error.response.data.message);
      });
  };

  //  check if the user is valid or not, and redirect the to the dashboard or do nothing

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          background: "#fff",
          borderRadius: 10,
          width: { xs: 300, sm: 350, md: 450, lg: 550 },
          height: { xs: 525, sm: 550 },
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
            {/* name text field */}
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              value={formData.name}
              onChange={handleChange}
              label="Name"
              name="name"
              autoComplete="name"
              autoFocus
            />
            {/* email text field */}
            <TextField
              margin="normal"
              required
              fullWidth
              value={formData.email}
              onChange={handleChange}
              id="email"
              type="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              color="primary"
            />
            {/* password text field */}
            <TextField
              margin="normal"
              required
              fullWidth
              value={formData.password}
              onChange={handleChange}
              name="password"
              label="Password"
              type="password"
              id="password"
              inputProps={{ minLength: 6, maxLength: 16 }}
              helperText={"6-16 characters."}
              autoComplete="current-password"
            />
            {/* if there is a message, render it  */}
            {message && (
              <Box sx={{ textAlign: "center", m: 2, fontWeight: 800 }}>
                {message}
              </Box>
            )}
            {/* Already have account link */}
            <Grid container sx={{ padding: 2 }}>
              <Grid item>
                <Link
                  href="/login"
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
                  {"Already have an account? Log in"}
                </Link>
              </Grid>
            </Grid>
            {/* submit button */}
            <Button
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
              Sign Up
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};
export default Register;

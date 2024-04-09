import React, { useState, useEffect, useRef } from "react";
import { Container, Avatar, Button, Box, Typography } from "@mui/material";
import logo from "../assets/logo.png";
import { useNavigate, useParams } from "react-router-dom";
import { apiAuth } from "../helpers/axios_helper";

const VerifyEmail = () => {
  const { token } = useParams();
  // error message (if one exists)
  const [message, setMessage] = useState(null);

  // used to switch between pages
  const navigate = useNavigate();

  const hasRunEffect = useRef(false);

  useEffect(() => {
    if (!hasRunEffect.current) {
      apiAuth
        .activateEmail(token)
        .then((response) => {
          setMessage(response.data);
        })
        .catch((error) => {
          setMessage("Verification failed. Please try again.");
        });
      hasRunEffect.current = true;
    }
  }, []);

  const handleRedirect = () => {
    navigate("/login");
  };

  return (
    <Container
      component="main"
      sx={{
        background: "#fff",
        borderRadius: 10,
        width: { xs: 300, sm: 350, md: 450, lg: 550 },
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
        <Typography variant="h5" color="initial">
          {message}
        </Typography>
        <Button
          sx={{ mb: 1, mt: 1 }}
          onClick={handleRedirect}
          variant="contained"
        >
          Go to Login
        </Button>
      </Box>
    </Container>
  );
};

export default VerifyEmail;

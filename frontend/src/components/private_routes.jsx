import { Navigate, Outlet } from "react-router-dom";
import { verifyAuth } from "../helpers/axios_helper";
import React, { useState, useEffect } from "react";
import { Box, CircularProgress } from "@mui/material";

const PrivateRoutes = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    verifyAuth().then((auth) => {
      setIsAuthenticated(auth);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};
export default PrivateRoutes;

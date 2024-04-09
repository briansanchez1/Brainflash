import React, { useState, useEffect } from "react";
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
  InputAdornment,
  IconButton,
} from "@mui/material";
import { pink } from "@mui/material/colors";
import logo from "../assets/logo.png";
import { useNavigate, useParams } from "react-router-dom";
import { setAuthHeader, verifyAuth, apiUsers } from "../helpers/axios_helper";
import AlertBox from "../components/alert_component";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: pink[100],
    },
  },
});

const ResetPassword = () => {
  // Recieved token
  const { token } = useParams();
  //Alert State
  const [showAlert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  // error state
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  // extra states
  const [showPassword, setShowPassword] = useState(false);

  // information that the user enters
  const [formData, setFormData] = useState({
    password: "",
    confirm_password: "",
  });

  // state to track loading
  const [isLoading, setIsLoading] = useState(true);

  // used to switch between pages
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "password" || name === "confirm_password") {
      if (value.length < 6) {
        setPasswordError(true);
        setPasswordErrorMessage("Password must be at least 6 characters.");
      } else if (name === "confirm_password" && value !== formData.password) {
        setPasswordError(true);
        setPasswordErrorMessage("Passwords do not match");
      } else {
        setPasswordError(false);
      }
    }

    setFormData({ ...formData, [name]: value });
    setAlert(false);
  };

  /*
  handles submition; sends a post request to the endpoint to register. is returned the
  JWT token for authorization.This can probably be added to a separate file with all
  of the reqests for the sake of cleaning things up, or added to the 
  axios helper file for the same reason. 
  */
  const handleSubmit = async (event) => {
    event.preventDefault();
    //if password and confurm pass dont match, error alert and exit the call.
    setAlert(false);
    if (formData.password.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage("Enter a valid password.");
      setAlert(true);
      setAlertMessage("Please fill out the form correctly.");
      return;
    }
    if (formData.password !== formData.confirm_password) {
      setPasswordError(true);
      setPasswordErrorMessage("Passwords do not match");
      return;
    } else {
      setPasswordError(false);
    }

    if (passwordError) {
      setAlert(true);
      setAlertMessage("Please fill out the form correctly.");
      return;
    }

    apiUsers
      .resetPass(token, formData)
      .then((response) => {
        const alertMsg = "Password has been reset.";
        navigate(`/login/${alertMsg}`);
      })
      .catch((error) => {});
  };

  // Redirects user if already logged in
  useEffect(() => {
    verifyAuth().then((auth) => {
      if (auth) {
        navigate("/");
      } else {
        setIsLoading(false);
      }
    });
  }, [navigate]);

  return (
    <>
      {isLoading ? null : (
        <>
          <ThemeProvider theme={defaultTheme}>
            <Container
              component="main"
              sx={{
                background: "#fff",
                borderRadius: 10,
                width: { xs: 300, sm: 350, md: 450, lg: 550 },
              }}
            >
              {showAlert && (
                <AlertBox severity={"error"} message={alertMessage} />
              )}
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
                  {/* password text field */}
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    value={formData.password}
                    onChange={handleChange}
                    name="password"
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    id="password"
                    inputProps={{ minLength: 6, maxLength: 20 }}
                    error={passwordError}
                    helperText={
                      passwordError ? passwordErrorMessage : "6-20 characters."
                    }
                    autoComplete="current-password"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                          >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  {/* password text field */}
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    value={formData.confirm_password}
                    onChange={handleChange}
                    name="confirm_password"
                    label="Confirm password"
                    type={showPassword ? "text" : "password"}
                    id="confirm_password"
                    inputProps={{ minLength: 6, maxLength: 20 }}
                    error={passwordError}
                    helperText={
                      passwordError ? passwordErrorMessage : "6-20 characters."
                    }
                    autoComplete="current-password"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                          >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />

                  {/* Already have account link */}
                  <Grid container sx={{ padding: 2 }}>
                    {/* submit button */}
                    <Button
                      type="submit"
                      className="submit"
                      variant="contained"
                      sx={{
                        m: "auto",
                        mt: 2,
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
                      Reset Password
                    </Button>
                  </Grid>
                </Box>
              </Box>
            </Container>
          </ThemeProvider>
        </>
      )}
    </>
  );
};
export default ResetPassword;

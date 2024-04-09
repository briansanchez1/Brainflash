import {
  Box,
  Button,
  Container,
  Typography,
  Stack,
  TextField,
  Divider,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import PasswordOutlined from "@mui/icons-material/PasswordOutlined";
import ActionModal from "../components/action_modal";
import { Email } from "@mui/icons-material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiUsers, setAuthHeader } from "../helpers/axios_helper";

const btnStyle = {
  color: "#000",
  bgcolor: "#dec0b1",
  borderRadius: "10px",
  ":hover": {
    bgcolor: "#b5a69f",
    color: "#000",
  },
};
const Settings = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [modalTitle, setModalTitle] = useState("");
  const [handleAction, setHandleAction] = useState(null);
  const [changePasswordRequest, setChangePasswordReset] = useState({});
  const [changeEmailRequest, setChangeEmailRequest] = useState({});
  const [emailError, setEmailError] = useState(false);
  const [newEmailError, setNewEmailError] = useState(false);
  const [confirmEmailError, setConfirmEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Validation function for password
  const validatePassword = (password) => {
    return password < 6;
  };

  const deleteAccount = () => {
    apiUsers
      .deleteUser()
      .then((response) => {
        // Delete account logic
        // Redirect to login page
        navigate("/login");
      })
      .catch((error) => {
        console.error("Error deleting account:", error);
      });
  };

  const changePassword = () => {
    apiUsers
      .changePassword(changePasswordRequest)
      .then((response) => {
        setAuthHeader(null);
        navigate("/login");
      })
      .catch((error) => {
        console.error("Error changing password:", error);
      });
  };

  const changeEmail = () => {
    if (
      !changeEmailRequest.currentEmail ||
      changeEmailRequest.currentEmail.length < 3
    ) {
      setEmailError(true);
      return;
    }
    if (
      !changeEmailRequest.newEmail ||
      changeEmailRequest.newEmail.length < 3
    ) {
      setNewEmailError(true);
      return;
    }
    if (
      !changeEmailRequest.confirmationEmail ||
      changeEmailRequest.confirmationEmail.length < 3
    ) {
      setConfirmEmailError(true);
      return;
    }
    if (
      !changeEmailRequest.password ||
      changeEmailRequest.password.length < 6
    ) {
      setPasswordError(true);
      return;
    }

    if (!validateEmail(changeEmailRequest.currentEmail)) {
      setEmailError(true);
      return;
    }
    if (!validateEmail(changeEmailRequest.newEmail)) {
      setNewEmailError(true);
      return;
    }
    if (!validateEmail(changeEmailRequest.confirmationEmail)) {
      setConfirmEmailError(true);
      return;
    }

    if (changeEmailRequest.newEmail !== changeEmailRequest.confirmationEmail) {
      setNewEmailError(true);
      setConfirmEmailError(true);
      return;
    }

    if (emailError || newEmailError || confirmEmailError || passwordError) {
      console.log(emailError, newEmailError, confirmEmailError, passwordError);
      return;
    }

    apiUsers
      .changeEmail(changeEmailRequest)
      .then((response) => {
        setAuthHeader(null);
        navigate("/login");
      })
      .catch((error) => {
        console.error("Error editing email:", error);
      });
  };

  const handleDeleteModalOpen = (item) => {
    setModalTitle("Delete Account");
    setModalContent("Are you sure you want to delete your account?");
    setHandleAction(() => () => deleteAccount());
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleChangePasswordModal = (item) => {
    setModalTitle("Change Password");
    setModalContent(
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="stretch"
        spacing={2}
      >
        <TextField
          name="currentPassword"
          onChange={(event) => {
            changePasswordRequest[event.target.name] = event.target.value;
          }}
          label="Enter Current Password"
          variant="outlined"
        ></TextField>
        <TextField
          name="newPassword"
          onChange={(event) => {
            changePasswordRequest[event.target.name] = event.target.value;
          }}
          label="Enter New Password"
          variant="outlined"
        ></TextField>
        <TextField
          name="confirmationPassword"
          onChange={(event) => {
            changePasswordRequest[event.target.name] = event.target.value;
          }}
          label="Re-Enter New Password"
          variant="outlined"
        ></TextField>
      </Stack>
    );
    setHandleAction(() => () => changePassword());
    setModalOpen(true);
  };

  const handleChangeEmailModal = (item) => {
    setModalTitle("Change Email");
    setModalContent(
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="stretch"
        spacing={2}
      >
        <TextField
          autoFocus
          name="currentEmail"
          id="currentEmail"
          type="email"
          label="Enter Current email"
          error={emailError}
          onChange={(event) => {
            changeEmailRequest[event.target.name] = event.target.value;
          }}
        ></TextField>
        <TextField
          name="newEmail"
          id="newEmail"
          type="email"
          label="Enter New Email"
          error={newEmailError}
          onChange={(event) => {
            changeEmailRequest[event.target.name] = event.target.value;
          }}
        ></TextField>
        <TextField
          name="confirmationEmail"
          id="confirmationEmail"
          type="email"
          label="Re-Enter New Email"
          error={confirmEmailError}
          onChange={(event) => {
            changeEmailRequest[event.target.name] = event.target.value;
          }}
        ></TextField>{" "}
        <TextField
          name="password"
          id="password"
          type="password"
          label="Enter Password"
          error={passwordError}
          onChange={(event) => {
            changeEmailRequest[event.target.name] = event.target.value;
          }}
        ></TextField>
      </Stack>
    );
    setHandleAction(() => () => changeEmail());
    setModalOpen(true);
  };
  return (
    <Container>
      <Typography variant="h3" textAlign={"center"} paddingTop={"100px"}>
        <Divider variant="insert">Settings</Divider>
      </Typography>

      <Box
        sx={{
          display: "flex",
          paddingTop: "50px",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Button
          variant="contained"
          onClick={handleChangeEmailModal}
          sx={{ bgcolor: "#E6A4B4", color: "#000" }}
          startIcon={<Email />}
        >
          Change Email
        </Button>
      </Box>

      <Box
        sx={{
          display: "flex",
          paddingTop: "50px",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Button
          variant="contained"
          onClick={handleChangePasswordModal}
          sx={{ bgcolor: "#E6A4B4", color: "#000" }}
          startIcon={<PasswordOutlined />}
        >
          Change Password
        </Button>
      </Box>

      <Box
        sx={{
          display: "flex",
          paddingTop: "50px",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Button
          onClick={handleDeleteModalOpen}
          variant="contained"
          color="error"
          startIcon={<Delete />}
        >
          Delete Account
        </Button>
      </Box>
      <ActionModal
        isOpen={isModalOpen}
        handleClose={handleCloseModal}
        title={modalTitle}
        content={modalContent}
        buttons={
          <>
            <Button onClick={handleCloseModal} sx={btnStyle}>
              Cancel
            </Button>
            <Button onClick={handleAction} sx={btnStyle}>
              Confirm
            </Button>
          </>
        }
      />
    </Container>
  );
};

export default Settings;

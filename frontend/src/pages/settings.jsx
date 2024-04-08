import { Box, Button, Container, Typography, Stack } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Divider from "@mui/material/Divider";
import ActionModal from "../components/action_modal";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiUsers, setAuthHeader } from "../helpers/axios_helper";
import TextField from "@mui/material/TextField";

const Settings = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [modalTitle, setModalTitle] = useState("");
  const [handleAction, setHandleAction] = useState(null);
  const [changePasswordRequest, setChangePasswordReset] = useState({});
  const [changeEmailRequest, setChangeEmailRequest] = useState({});

  const navigate = useNavigate();

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
          onChange={(event) => {
            changeEmailRequest[event.target.name] = event.target.value;
          }}
        ></TextField>
        <TextField
          name="newEmail"
          id="newEmail"
          type="email"
          label="Enter New Email"
          onChange={(event) => {
            changeEmailRequest[event.target.name] = event.target.value;
          }}
        ></TextField>
        <TextField
          name="confirmationEmail"
          id="confirmationEmail"
          type="email"
          label="Re-Enter New Email"
          onChange={(event) => {
            changeEmailRequest[event.target.name] = event.target.value;
          }}
        ></TextField>{" "}
        <TextField
          name="password"
          id="password"
          type="password"
          label="Enter Password"
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
        <Button variant="contained" onClick={handleChangeEmailModal}>
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
        <Button variant="contained" onClick={handleChangePasswordModal}>
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
          startIcon={<DeleteIcon />}
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
            <Button onClick={handleCloseModal}>Cancel</Button>
            <Button onClick={handleAction}>Confirm</Button>
          </>
        }
      />
    </Container>
  );
};

export default Settings;

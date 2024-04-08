
import{ Box, Button, Container, Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
//import { Stack } from '@mui/system';
import Divider from '@mui/material/Divider';
import ActionModal from "../components/action_modal";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiUsers } from "../helpers/axios_helper";


const Settings = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [modalTitle, setModalTitle] = useState("");
  const [handleAction, setHandleAction] = useState(null);

  const navigate = useNavigate();

  const deleteAccount = () => {
    apiUsers.deleteUser().then((response) => {
      // Delete account logic
      // Redirect to login page
      navigate("/login");
    }).catch((error) => {
      console.error("Error deleting account:", error);
    });
  }
    

  const handleDeleteModalOpen = (item) => {
    setModalTitle("Delete Account");
    setModalContent("Are you sure you want to delete your account?");
    setHandleAction(() => () => deleteAccount());
    setModalOpen(true);
  }

  const handleCloseDeleteModal = () => {
    setModalOpen(false);
  }

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
        <Button variant="contained">Change Email</Button>
      </Box>

      <Box
        sx={{
          display: "flex",
          paddingTop: "50px",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Button variant="contained">Change Password</Button>
      </Box>

      <Box
        sx={{
          display: "flex",
          paddingTop: "50px",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Button onClick={handleDeleteModalOpen} variant="contained" color="error" startIcon={<DeleteIcon />}>
          Delete Account
        </Button>
      </Box>
      <ActionModal
        isOpen={isModalOpen}
        handleClose={handleCloseDeleteModal}
        title={modalTitle}
        content={modalContent}
        buttons={
          <>
            <Button onClick={handleCloseDeleteModal}>Cancel</Button>
            <Button onClick={handleAction}>Confirm</Button>
          </>
        }
      />
    </Container>
  );
};

export default Settings; 

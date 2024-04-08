
import{ Box, Button, Container, Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
//import { Stack } from '@mui/system';
import Divider from '@mui/material/Divider';


const Settings = () => {
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
        <Button variant="contained" color="error" startIcon={<DeleteIcon />}>
          Delete Account
        </Button>
      </Box>
    </Container>
  );
};

export default Settings; 

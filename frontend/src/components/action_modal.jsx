import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Grid, ThemeProvider, createTheme } from "@mui/material";

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: "#E6A4B4",
    },
  },
});

const ActionModal = ({ isOpen, handleClose, title, content, buttons }) => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Dialog open={isOpen} onClose={handleClose}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <Grid container mt={1}>
            {content}
          </Grid>
        </DialogContent>
        <DialogActions>{buttons}</DialogActions>
      </Dialog>
    </ThemeProvider>
  );
};

export default ActionModal;

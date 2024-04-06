import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Grid } from "@mui/material";

const ActionModal = ({ isOpen, handleClose, title, content, buttons }) => {
  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Grid container mt={1}>
          {content}
        </Grid>
      </DialogContent>
      <DialogActions>{buttons}</DialogActions>
    </Dialog>
  );
};

export default ActionModal;

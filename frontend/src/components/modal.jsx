import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Add } from "@mui/icons-material";
import { Grid, ToggleButtonGroup, ToggleButton, Stack } from "@mui/material";
import FlashcardView from "../components/modal_components/flashcard_focus";
import DeckView from "../components/modal_components/deck_focus";
import CategoryView from "../components/modal_components/category_focus";
import PFEView from "../components/modal_components/PFE_focus";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: 250, sm: 350, md: 500, lg: 700 },
  height: 400,
  bgcolor: "background.paper",

  boxShadow: 24,
  p: 4,
};
const btnStyle = {
  color: "black",
  fontWeight: "600",
  width: { xs: 150, sm: 250, md: 400, lg: 700 },
  fontSize: { xs: 10, md: 15, lg: 15 },
};

export default function ModalComponent({ focus }) {
  const [active, setActive] = useState(focus);
  const [open, setOpen] = useState(false);

  const handleChange = (event, newActive) => {
    if (newActive !== null) {
      setActive(newActive);
    }
  };
  const handleOpen = () => {
    setOpen(true);
    setActive(focus);
  };

  const handleClose = () => {
    setOpen(false);
    setActive("flashcard");
  };

  const handleSubmit = () => {
    setOpen(false);
  };

  const children = [
    <ToggleButton
      value="flashcard"
      key="flashcard"
      color="primary"
      sx={btnStyle}
    >
      Flashcard
    </ToggleButton>,
    <ToggleButton value="deck" key="deck" color="primary" sx={btnStyle}>
      Deck
    </ToggleButton>,
    <ToggleButton value="category" key="category" color="primary" sx={btnStyle}>
      Category
    </ToggleButton>,
    <ToggleButton value="review" key="review" color="primary" sx={btnStyle}>
      Review
    </ToggleButton>,
  ];

  const control = {
    value: active,
    onChange: handleChange,
    exclusive: true,
  };

  return (
    <div>
      <Button
        onClick={handleOpen}
        sx={{
          textDecoration: "none",
          color: "#000",
          bgcolor: "#BDBDBD",

          borderRadius: "20px",
          width: "20px",
          transition: "0.2s",
          ":hover": {
            bgcolor: "#656565",
            color: "#fff",
          },
        }}
      >
        <Add />
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Stack spacing={2}>
            <Typography
              id="modal-modal-title"
              variant="h4"
              textAlign={"center"}
            >
              What would you like to create?
            </Typography>
            <ToggleButtonGroup
              {...control}
              sx={{ justifyContent: "center", color: "black" }}
            >
              {children}
            </ToggleButtonGroup>
            <Grid container spacing={2}>
              {active === "flashcard" && <FlashcardView />}
              {active === "deck" && <DeckView />}
              {active === "category" && <CategoryView />}
              {active === "review" && <PFEView />}
            </Grid>

            <Grid item xs={12} textAlign={"center"}>
              <Button variant="contained" onClick={handleSubmit}>
                Create
              </Button>
            </Grid>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}

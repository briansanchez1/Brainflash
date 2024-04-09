import React, { useContext, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Add } from "@mui/icons-material";
import { Grid, ToggleButtonGroup, ToggleButton, Stack,  ThemeProvider, createTheme } from "@mui/material";
import FlashcardModalView from "../components/modal_components/flashcard_focus";
import DeckView from "../components/modal_components/deck_focus";
import CategoryView from "../components/modal_components/category_focus";
import PFEView from "../components/modal_components/PFE_focus";
import { BrainflashContext } from "./context/brainflash_context";
import {
  apiFlashcards,
  apiPFESessions,
  apiCategories,
  apiDecks,
} from "../helpers/axios_helper";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: 250, sm: 350, md: 500, lg: 700 },
  height: "auto",
  bgcolor: "background.paper",
  borderRadius: "30px",
  boxShadow: 24,
  p: 4,
};

const btnStyle = {
  fontWeight: "600",
  width: { xs: 150, sm: 250, md: 400, lg: 700 },
  fontSize: { xs: 10, md: 15, lg: 15 },
  color: "#000",
};

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: "#E6A4B4",
    },
  },
});

export default function ModalComponent({ focus }) {
  const [active, setActive] = useState(focus);
  const [open, setOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const { addFlashcard, addSession, addCategory, addDeck } =
    useContext(BrainflashContext);

  const createFlashcard = (flashcard) => {
    apiFlashcards
      .createFlashcard(flashcard)
      .then((response) => {
        flashcard.id = response.data.id;
        addFlashcard(flashcard);
        setCurrentItem(null);
      })
      .catch((error) => {});
  };

  const createSession = (session) => {
    apiPFESessions
      .createSession(session)
      .then((response) => {
        addSession(response.data);
        setCurrentItem(null);
      })
      .catch((error) => {});
  };

  const createCategory = (category) => {
    apiCategories
      .createCategory(category)
      .then((response) => {
        addCategory(response.data);
        setCurrentItem(null);
      })
      .catch((error) => {});
  };

  const createDeck = (deck) => {
    apiDecks
      .createDeck(deck)
      .then((response) => {
        addDeck(response.data);
        setCurrentItem(null);
      })
      .catch((error) => {});
  };

  const handleChange = (event, newActive) => {
    if (newActive !== null) {
      setCurrentItem(null);
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
    switch (active) {
      case "flashcard":
        createFlashcard(currentItem);
        break;
      case "deck":
        createDeck(currentItem);
        break;
      case "category":
        createCategory(currentItem);
        break;
      case "review":
        createSession(currentItem);
        break;
      default:
    }

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
    <ThemeProvider theme={defaultTheme}>
      <Button
        onClick={handleOpen}
        sx={{
          textDecoration: "none",
          color: "#000",
          bgcolor: "#dec0b1",
          borderRadius: "10px",
          ":hover": {
            bgcolor: "#b5a69f",
            color: "#000",
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
              {active === "flashcard" && (
                <FlashcardModalView
                  flashcard={currentItem}
                  onFlashcardEdit={setCurrentItem}
                />
              )}
              {active === "deck" && (
                <DeckView deck={currentItem} onDeckEdit={setCurrentItem} />
              )}
              {active === "category" && (
                <CategoryView
                  category={currentItem}
                  onCategoryEdit={setCurrentItem}
                />
              )}
              {active === "review" && (
                <PFEView session={currentItem} onSessionEdit={setCurrentItem} />
              )}
            </Grid>

            <Grid item xs={12} textAlign={"center"}>
              <Button variant="contained" onClick={handleSubmit} sx={{fontWeight: 700}}>
                Create
              </Button>
            </Grid>
          </Stack>
        </Box>
      </Modal>
    </ThemeProvider>
  );
}

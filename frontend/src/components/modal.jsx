import React, { useContext, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Add } from "@mui/icons-material";
import { Grid, ToggleButtonGroup, ToggleButton, Stack } from "@mui/material";
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
import AlertBox from "../components/alert_component";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: 250, sm: 350, md: 500, lg: 700 },
  height: "auto",
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
  const [currentItem, setCurrentItem] = useState(null);
  const { addFlashcard, addSession, addCategory, addDeck } =
    useContext(BrainflashContext);

  const [alert, setAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("");

  const createFlashcard = (flashcard) => {
    console.log(flashcard);
    if (!flashcard) {
      setAlert(true);
      setAlertSeverity("error");
      setAlertMsg("Please fill out fields");
      return;
    }
    if (!flashcard.question) {
      setAlert(true);
      setAlertSeverity("error");
      setAlertMsg("Entera an question.");
      return;
    }

    if (flashcard.question.length < 3) {
      setAlert(true);
      setAlertSeverity("error");
      setAlertMsg("Flashcard question must be at least 3 characters.");
      return;
    }
    if (!flashcard.answer) {
      setAlert(true);
      setAlertSeverity("error");
      setAlertMsg("Entera an answer.");
      return;
    }
    if (!flashcard.categoryId) {
      setAlert(true);
      setAlertSeverity("error");
      setAlertMsg("Select a category when creating a flashcard.");
      return;
    }

    apiFlashcards
      .createFlashcard(flashcard)
      .then((response) => {
        flashcard.id = response.data.id;
        addFlashcard(flashcard);
        setCurrentItem(null);
        setAlert(true);
        setAlertMsg("Flashcard successfully created.");
        setAlertSeverity("success");
      })
      .catch((error) => {});
  };

  const createSession = (session) => {
    if (!session) {
      setAlert(true);
      setAlertSeverity("error");
      setAlertMsg("Please fill out fields");
      return;
    }
    if (!session.title) {
      setAlert(true);
      setAlertSeverity("error");
      setAlertMsg("Enter a title for your session.");
      return;
    }
    if (session.title.length < 3) {
      setAlert(true);
      setAlertSeverity("error");
      setAlertMsg("Session title must be at least 3 characters.");
      return;
    }
    if (!session.startDate) {
      setAlert(true);
      setAlertSeverity("error");
      setAlertMsg("Enter a start date.");
      return;
    }
    if (!session.endDate) {
      setAlert(true);
      setAlertSeverity("error");
      setAlertMsg("Enter a start date.");
      return;
    }
    if (!session.categoryId && !session.deckId) {
      setAlert(true);
      setAlertSeverity("error");
      setAlertMsg("Enter either a category or a deck when creating a session.");
      return;
    }

    apiPFESessions
      .createSession(session)
      .then((response) => {
        addSession(response.data);
        setCurrentItem(null);
        setAlert(true);
        setAlertMsg("Session successfully created.");
        setAlertSeverity("success");
      })
      .catch((error) => {});
  };

  const createCategory = (category) => {
    if (!category) {
      setAlert(true);
      setAlertSeverity("error");
      setAlertMsg("Please enter a valid title.");
      return;
    }
    if (category.title.length < 3) {
      setAlert(true);
      setAlertSeverity("error");
      setAlertMsg("Please enter a valid title.");
      return;
    }

    apiCategories
      .createCategory(category)
      .then((response) => {
        addCategory(response.data);
        setCurrentItem(null);
        setAlert(true);
        setAlertMsg("Category successfully created.");
        setAlertSeverity("success");
      })
      .catch((error) => {});
  };

  const createDeck = (deck) => {
    if (!deck) {
      setAlert(true);
      setAlertMsg("Please enter a valid title.");
      setAlertSeverity("error");
      return;
    }
    if (deck.title.length < 3) {
      setAlert(true);
      setAlertMsg("Deck title must be at least 3 characters.");
      setAlertSeverity("error");
      return;
    }
    apiDecks
      .createDeck(deck)
      .then((response) => {
        addDeck(response.data);
        setCurrentItem(null);
        setAlert(true);
        setAlertMsg("Deck successfully created.");
        setAlertSeverity("success");
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
    setAlert(false);
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
    <>
      <Button
        onClick={handleOpen}
        sx={{
          textDecoration: "none",
          color: "#fff",
          bgcolor: "#747474",
          borderRadius: "10px",
          ":hover": {
            bgcolor: "#171717",
            color: "#fff",
            border: "none",
          },
        }}
      >
        <Add />
      </Button>
      {alert && <AlertBox message={alertMsg} severity={alertSeverity} />}
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
              <Button variant="contained" onClick={handleSubmit}>
                Create
              </Button>
            </Grid>
          </Stack>
        </Box>
      </Modal>
    </>
  );
}

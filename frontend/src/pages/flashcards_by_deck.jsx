import React, { useState, useEffect, useContext } from "react";
import { apiFlashcards } from "../helpers/axios_helper";
import FlashcardModalView from "../components/modal_components/flashcard_focus";
import GridView from "../components/grid_view";
import AlertBox from "../components/alert_component";
import { BrainflashContext } from "../components/context/brainflash_context";
import Typography from "@mui/material/Typography";
import ActionCard, { CardAction } from "../components/action_card";
import CardFlip from "react-card-flip";
import Box from "@mui/material/Box";

const FlashcardsByDeckGrid = ({ deckId }) => {
  //Alert State
  const [showAlert, setAlert] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const { flashcards, setFlashcards, removeFlashcard, updateFlashcard } =
    useContext(BrainflashContext);
  const [flippedCardId, setFlippedCardId] = useState(null);

    // Fetch all flashcards by deck id when the component mounts
    useEffect(() => {
        apiFlashcards
            .getFlashcardsByDeck(deckId)
            .then((response) => {
                setFlashcards(response.data); // Set the flashcards in state
            })
            .catch((error) => {
                console.error("Error fetching flashcards:", error);
                console.log(deckId);
            });
    }, [deckId]);

  const handleClick = (flashcard) => {
    // Handle click event, for example, navigate to a flashcard detail page
    console.log("Clicked flashcard:", flashcard);
    setFlippedCardId(flashcard.id === flippedCardId ? null : flashcard.id);
  };

  const editModal = (f, handle) => {
    return <FlashcardModalView flashcard={f} onFlashcardEdit={handle} />;
  };

  const confirmEditAction = (f, callback) => {
    setAlert(false);
    apiFlashcards
      .updateFlashcard(f.id, f)
      .then((response) => {
        updateFlashcard(f);
        setAlert(true);
        setAlertMessage(response.data.message);
        setAlertSeverity("success");
        callback(f);
      })
      .catch((error) => {
        setAlertMessage(error);
        setAlertSeverity("error");
      });
  };

  const confirmDeleteAction = (deletedFlash, callback) => {
    setAlert(false);
    apiFlashcards
      .deleteFlashcard(deletedFlash.id)
      .then((response) => {
        removeFlashcard(deletedFlash.id);
        setAlert(true);
        setAlertMessage(response.data.message);
        setAlertSeverity("success");
        callback(deletedFlash);
      })
      .catch((error) => {
        setAlertMessage(error);
        setAlertSeverity("error");
      });
  };

  return (
    <>
      {showAlert && (
        <AlertBox severity={alertSeverity} message={alertMessage} />
      )}
      <GridView
        title="Flashcards"
        items={flashcards}
        itemName="flashcard"
        onItemClick={(item) => handleClick(item)}
        onItemDelete={(f, callback) => confirmDeleteAction(f, callback)}
        onItemEdit={(f, callback) => confirmEditAction(f, callback)}
        editModalContent={(f, handle) => editModal(f, handle)}
        cardContent={(flashcard) => {
          return (
            <Typography variant="h6" component="h2" align="center">
              {flashcard.question}
            </Typography>
          );
        }}
        customItem={(flashcard, handleEditModalOpen, handleDeleteModalOpen) => {
          return (
            <CardFlip
              isFlipped={flashcard.id === flippedCardId}
              flipDirection="vertical"
            >
              <ActionCard
                key={"front"}
                content={
                  <>
                    <Typography
                      variant="h6"
                      align="center"
                      sx={{ opacity: 0.35 }}
                    >
                      {"Question"}
                    </Typography>

                    <Typography variant="h6" align="center">
                      {flashcard.question}
                    </Typography>
                  </>
                }
                onClick={() => handleClick(flashcard)}
                actions={[
                  <CardAction
                    key="edit"
                    label="Edit"
                    onClick={() => handleEditModalOpen(flashcard)}
                  />,
                  <CardAction
                    key="delete"
                    label="Delete"
                    onClick={() => handleDeleteModalOpen(flashcard)}
                  />,
                ]}
              />
              <ActionCard
                key={"back"}
                content={
                  <>
                    <Typography
                      variant="h6"
                      align="center"
                      sx={{ opacity: 0.35 }}
                    >
                      {"Answer"}
                    </Typography>

                    <Typography variant="h6" align="center">
                      {flashcard.answer}
                    </Typography>
                  </>
                }
                onClick={() => handleClick(flashcard)}
                actions={[
                  <CardAction
                    key="edit"
                    label="Edit"
                    onClick={() => handleEditModalOpen(flashcard)}
                  />,
                  <CardAction
                    key="delete"
                    label="Delete"
                    onClick={() => handleDeleteModalOpen(flashcard)}
                  />,
                ]}
              />
            </CardFlip>
          );
        }}
        onSearchFilter={(flashcard, searchTerm) =>
          flashcard.question.toLowerCase().includes(searchTerm.toLowerCase())
        }
      ></GridView>
    </>
  );
};

export default FlashcardsByDeckGrid;

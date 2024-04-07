import React, { useState, useEffect, useContext } from "react";
import { apiFlashcards } from "../helpers/axios_helper";
import FlashcardModalView from "../components/modal_components/flashcard_focus";
import GridView from "../components/grid_view";
import AlertBox from "../components/alert_component";
import { BrainflashContext } from "../components/context/brainflash_context";
import Typography from "@mui/material/Typography";
import ActionCard, { CardAction } from "../components/action_card";

const Flashcards = () => {
  //Alert State
  const [showAlert, setAlert] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const { flashcards, setFlashcards, removeFlashcard, updateFlashcard } =
    useContext(BrainflashContext);

  useEffect(() => {
    // Fetch all flashcards when the component mounts
    apiFlashcards
      .getAllFlashcards()
      .then((response) => {
        setFlashcards(
          response.data.map((f) => {
            return f;
          })
        );
      })
      .catch((error) => {
        console.error("Error fetching flashcards:", error);
      });
  }, []);

  const handleClick = (flashcard) => {
    // Handle click event, for example, navigate to a flashcard detail page
    console.log("Clicked flashcard:", flashcard);
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
            <ActionCard
              content={
                <Typography variant="h6" component="h2" align="center">
                  {flashcard.question}
                </Typography>
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
          );
        }}
        onSearchFilter={(flashcard, searchTerm) =>
          flashcard.question.toLowerCase().includes(searchTerm.toLowerCase())
        }
      ></GridView>
    </>
  );
};

export default Flashcards;

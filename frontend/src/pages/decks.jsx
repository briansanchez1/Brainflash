import React, { useState, useEffect, useContext } from "react";
import { apiDecks } from "../helpers/axios_helper";
import DeckModalView from "../components/modal_components/deck_focus";
import GridView from "../components/grid_view";
import AlertBox from "../components/alert_component";
import { BrainflashContext } from "../components/context/brainflash_context";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

const Decks = () => {
  //Alert State
  const [showAlert, setAlert] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const { decks, setDecks, removeDeck, updateDeck } =
    useContext(BrainflashContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch all decks when the component mounts
    apiDecks
      .getAllDecks()
      .then((response) => {
        setDecks(
          response.data.map((d) => {
            return d;
          })
        );
      })
      .catch((error) => {
        console.error("Error fetching decks:", error);
      });
  }, []);

  const handleClick = (deck) => {
    // Handle click event, navigate to a deck detail page
    navigate(`/flashcards/deck/${deck.id}`);
  };

  const editModal = (d, handle) => {
    return <DeckModalView deck={d} onDeckEdit={handle} />;
  };

  const confirmEditAction = (d, callback) => {
    setAlert(false);
    apiDecks
      .updateDeck(d.id, d)
      .then((response) => {
        updateDeck(d);
        setAlert(true);
        setAlertMessage(response.data.message);
        setAlertSeverity("success");
        callback(d);
      })
      .catch((error) => {
        setAlertMessage(error);
        setAlertSeverity("error");
      });
  };

  const confirmDeleteAction = (deletedDeck, callback) => {
    setAlert(false);
    apiDecks
      .deleteDeck(deletedDeck.id)
      .then((response) => {
        removeDeck(deletedDeck.id);
        setAlert(true);
        setAlertMessage(response.data.message);
        setAlertSeverity("success");
        callback(deletedDeck);
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
        title="Decks"
        items={decks}
        itemName="Deck"
        onItemClick={(item) => handleClick(item)}
        onItemDelete={(d, callback) => confirmDeleteAction(d, callback)}
        onItemEdit={(d, callback) => confirmEditAction(d, callback)}
        editModalContent={(d, handle) => editModal(d, handle)}
        cardContent={(Deck) => {
          return (
            <Typography variant="h6" component="h2" align="center">
              {Deck.title}
            </Typography>
          );
        }}
        onSearchFilter={(Deck, searchTerm) =>
          Deck.title.toLowerCase().includes(searchTerm.toLowerCase())
        }
      ></GridView>
    </>
  );
};

export default Decks;

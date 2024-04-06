import React, { useState, useEffect } from "react";
import { Typography, Container, Button } from "@mui/material";
import { apiDecks } from "../helpers/axios_helper";
import ActionModal from "../components/action_modal";
import DeckView from "../components/modal_components/deck_focus";
import CardGridView from "../components/grid_view";
import { SearchField } from "../components/text_fields";

const DecksGrid = () => {
  const [decks, setDecks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  // Modal states
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [modalTitle, setModalTitle] = useState("");
  const [handleAction, setHandleAction] = useState(null);

  useEffect(() => {
    // Fetch all decks when the component mounts
    apiDecks
      .getAllDecks()
      .then((response) => {
        setDecks(response.data); // Set the decks in state
      })
      .catch((error) => {
        console.error("Error fetching decks:", error);
      });
  }, []);

  // Updates filtered decks
  const filteredDecks = decks.filter((deck) =>
    deck.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Modal
  const handleEditModalOpen = (deck) => {
    setModalTitle("Edit Decks");
    setModalContent(
      <DeckView
        deck={deck}
        onUpdate={(d) => {
          setHandleAction(() => () => confirmEditAction(d));
        }}
      />
    );
    setModalOpen(true);
  };

  const handleDeleteModalOpen = (deck) => {
    setModalTitle("Delete Decks");
    setModalContent("Are you sure you want to delete this deck?");
    setHandleAction(() => () => confirmDeleteAction(deck));
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const confirmDeleteAction = (deck) => {
    apiDecks
      .deleteDeck(deck.id)
      .then((response) => {
        setDecks(decks.filter((d) => d.id !== deck.id));
        handleCloseModal();
      })
      .catch((error) => {
        console.error("Error deleting deck:", error);
      });
  };

  const confirmEditAction = (d) => {
    apiDecks
      .updateDeck(d.id, d.title)
      .then((response) => {
        // Assuming response.data is the updated deck object
        const updatedDecks = decks.map((deck) => {
          return deck.id === d.id ? d : deck;
        });
        setDecks(updatedDecks);
        handleCloseModal();
      })
      .catch((error) => {
        console.error("Error updating deck:", error);
      });
  };

  const handleClick = (deck) => {
    // Handle click event, for example, navigate to a deck detail page
    console.log("Clicked deck:", deck);
  };

  return (
    <Container>
      <Typography sx={{ my: 4, textAlign: "left" }} variant="h4">
        Decks
      </Typography>
      <SearchField onSearch={(event) => setSearchTerm(event.target.value)} />
      <CardGridView
        itemName={"Decks"}
        items={filteredDecks}
        cardContent={(item) => (
          <Typography variant="h6" component="h2" align="center">
            {item.title}
          </Typography>
        )}
        onCardClick={(deck) => handleClick(deck)}
        onCardEdit={(deck) => handleEditModalOpen(deck)}
        onCardDelete={(deck) => handleDeleteModalOpen(deck)}
      ></CardGridView>
      <ActionModal
        isOpen={isModalOpen}
        handleClose={handleCloseModal}
        title={modalTitle}
        content={modalContent}
        buttons={
          <>
            <Button onClick={handleCloseModal}>Cancel</Button>
            <Button onClick={handleAction}>Confirm</Button>
          </>
        }
      />
    </Container>
  );
};

export default DecksGrid;

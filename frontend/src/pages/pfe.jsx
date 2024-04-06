import React, { useState, useEffect } from "react";
import { Typography, Container, Button } from "@mui/material";
import { apiPFESessions } from "../helpers/axios_helper";
import ActionModal from "../components/action_modal";
import SessionView from "../components/modal_components/PFE_focus";
import CardGridView from "../components/grid_view";
import { SearchField } from "../components/text_fields";

const PFEGrid = () => {
  const [sessions, setSessions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  // Modal states
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [modalTitle, setModalTitle] = useState("");
  const [handleAction, setHandleAction] = useState(null);

  useEffect(() => {
    // Fetch all sessions when the component mounts
    apiPFESessions
      .getAllSessions()
      .then((response) => {
        setSessions(response.data); // Set the sessions in state
      })
      .catch((error) => {
        console.error("Error fetching sessions:", error);
      });
  }, []);

  // Updates filtered sessions
  const filteredSessions = sessions.filter((session) =>
    session.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Modal
  const handleEditModalOpen = (session) => {
    setModalTitle("Edit Sessions");
    setModalContent(
      <SessionView
        session={session}
        onSessionEdit={(s) => {
          setHandleAction(() => () => confirmEditAction(s));
        }}
      />
    );
    setModalOpen(true);
  };

  const handleDeleteModalOpen = (session) => {
    setModalTitle("Delete Sessions");
    setModalContent("Are you sure you want to delete this session?");
    setHandleAction(() => () => confirmDeleteAction(session));
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const confirmDeleteAction = (session) => {
    apiPFESessions
      .deleteSession(session.id)
      .then((response) => {
        setSessions(sessions.filter((s) => s.id !== session.id));
        handleCloseModal();
      })
      .catch((error) => {
        console.error("Error deleting session:", error);
      });
  };

  const confirmEditAction = (s) => {
    apiPFESessions
      .updateSession(s.id, s)
      .then((response) => {
        // Assuming response.data is the updated session object
        const updatedSessions = sessions.map((session) => {
          return session.id === s.id ? s : session;
        });
        setSessions(updatedSessions);
        handleCloseModal();
      })
      .catch((error) => {
        console.error("Error updating session:", error);
      });
  };

  const handleClick = (session) => {
    // Handle click event, for example, navigate to a session detail page
    console.log("Clicked session:", session);
  };

  return (
    <Container>
      <Typography sx={{ my: 4, textAlign: "left" }} variant="h4">
        Review Sessions
      </Typography>
      <SearchField onSearch={(event) => setSearchTerm(event.target.value)} />
      <CardGridView
        itemName={"Sessions"}
        items={filteredSessions}
        cardContent={(item) => (
          <Typography variant="h6" component="h2" align="center">
            {item.title}
          </Typography>
        )}
        onCardClick={(session) => handleClick(session)}
        onCardEdit={(session) => handleEditModalOpen(session)}
        onCardDelete={(session) => handleDeleteModalOpen(session)}
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

export default PFEGrid;

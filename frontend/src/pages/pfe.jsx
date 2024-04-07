import React, { useState, useEffect, useContext } from "react";
import { apiPFESessions } from "../helpers/axios_helper";
import SessionView from "../components/modal_components/PFE_focus";
import GridView from "../components/grid_view";
import AlertBox from "../components/alert_component";
import { BrainflashContext } from "../components/context/brainflash_context";
import Typography from "@mui/material/Typography";

const PFES = () => {
  //Alert State
  const [showAlert, setAlert] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const { sessions, setSessions, removeSession, updateSession } =
    useContext(BrainflashContext);

  useEffect(() => {
    // Fetch all sessions when the component mounts
    apiPFESessions
      .getAllSessions()
      .then((response) => {
        setSessions(
          response.data.map((s) => {
            return s;
          })
        );
      })
      .catch((error) => {
        console.error("Error fetching sessions:", error);
      });
  }, []);

  const handleClick = (session) => {
    // Handle click event, for example, navigate to a session detail page
    console.log("Clicked session:", session);
  };

  const editModal = (s, handle) => {
    return <SessionView session={s} onSessionEdit={handle} />;
  };

  const confirmEditAction = (s, callback) => {
    setAlert(false);
    apiPFESessions
      .updateSession(s.id, s)
      .then((response) => {
        updateSession(s);
        setAlert(true);
        setAlertMessage(response.data.message);
        setAlertSeverity("success");
        callback(s);
      })
      .catch((error) => {
        setAlertMessage(error);
        setAlertSeverity("error");
      });
  };

  const confirmDeleteAction = (deletedSession, callback) => {
    setAlert(false);
    apiPFESessions
      .deleteSession(deletedSession.id)
      .then((response) => {
        removeSession(deletedSession.id);
        setAlert(true);
        setAlertMessage(response.data.message);
        setAlertSeverity("success");
        callback(deletedSession);
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
        title="Review Sessions"
        items={sessions}
        itemName="session"
        onItemClick={(item) => handleClick(item)}
        onItemDelete={(s, callback) => confirmDeleteAction(s, callback)}
        onItemEdit={(s, callback) => confirmEditAction(s, callback)}
        editModalContent={(s, handle) => editModal(s, handle)}
        cardContent={(session) => {
          return (
            <Typography variant="h6" component="h2" align="center">
              {session.title}
            </Typography>
          );
        }}
        onSearchFilter={(session, searchTerm) =>
          session.title.toLowerCase().includes(searchTerm.toLowerCase())
        }
      ></GridView>
    </>
  );
};

export default PFES;

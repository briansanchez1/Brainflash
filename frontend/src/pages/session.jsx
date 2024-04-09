import React, { useState, useEffect, useContext } from "react";
import { apiPFESessions, apiFlashcards } from "../helpers/axios_helper";
import CategoryModalView from "../components/modal_components/category_focus";
import GridView from "../components/grid_view";
import AlertBox from "../components/alert_component";
import { BrainflashContext } from "../components/context/brainflash_context";
import { useNavigate, useParams } from "react-router-dom";
import { SearchField } from "../components/text_fields";
import CardGrid from "../components/card_grid";
import ActionCard from "../components/action_card";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import CardFlip from "react-card-flip";
import utc from "dayjs/plugin/utc";

import {
  Stack,
  Button,
  Container,
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
} from "@mui/material";
import dayjs from "dayjs";

const Session = () => {
  //Alert State
  const [showAlert, setAlert] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const { activeSession } = useContext(BrainflashContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();
  const [flippedCardId, setFlippedCardId] = useState(null);
  const [showInfo, setShowInfo] = useState(false);
  const [showSessionView, setShowSessionView] = useState(false);
  const [showSummaryView, setShowSummaryView] = useState(false);
  const [isSessionDate, setIsSessionDate] = useState(false);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  dayjs.extend(utc);

  useEffect(() => {
    if (!activeSession) {
      navigate("/pfe");
      return;
    }

    let today = new Date();
    today.setDate(today.getDate());
    today.setHours(0, 0, 0, 0);
    const startDate = new Date(
      dayjs(activeSession.startDate).utc().format("MM/DD/YYYY")
    );
    const endDate = new Date(
      dayjs(activeSession.endDate).utc().format("MM/DD/YYYY")
    );

    // Checks if current date is a review session day
    setIsSessionDate(today >= startDate && today <= endDate ? true : false);

    let apiCall = null;
    let id = null;

    if (activeSession.categoryId) {
      apiCall = apiFlashcards.getFlashcardsByCategory;
      id = activeSession.categoryId;
    } else {
      apiCall = apiFlashcards.getFlashcardsByDeck;
      id = activeSession.deckId;
    }

    apiCall(id)
      .then((response) => {
        //const questionList = shuffleCards(response.data);
        const questionList = response.data;

        // Calculate amount of days for the session
        if (questionList.length > 10) {
          let sessionTotalDays = getDaysBetweenDates(startDate, endDate);
          sessionTotalDays = sessionTotalDays === 0 ? 1 : sessionTotalDays;
          const cardsPerDay = Math.ceil(questionList.length / sessionTotalDays);
          const daysWorthOfStudy = getDaysBetweenDates(startDate, today);
          const questionsForToday = questionList.slice(
            0,
            daysWorthOfStudy * cardsPerDay + cardsPerDay
          );

          setQuestions(shuffleCards(questionsForToday));
          setCurrentIndex(0);
        } else {
          setQuestions(questionList);
          setCurrentIndex(0);
        }

        setShowInfo(true);
      })
      .catch((error) => {});
  }, []);

  function shuffleCards(cards) {
    for (let i = cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cards[i], cards[j]] = [cards[j], cards[i]];
    }
    return cards;
  }

  const getDaysBetweenDates = (startDate, endDate) => {
    const differenceInTime = endDate.getTime() - startDate.getTime();
    return Math.floor(differenceInTime / (1000 * 3600 * 24));
  };

  const handleFlashcardClick = (flashcard) => {
    setFlippedCardId(flashcard.id === flippedCardId ? null : flashcard.id);
  };

  const handleCorrectClick = (flashcard) => {
    setCorrectCount(correctCount + 1);
    setCurrentIndex((prevIndex) => {
      const nextIdx = (prevIndex + 1) % questions.length;

      if (nextIdx === 0) {
        setShowSessionView(false);
        setShowSummaryView(true);
      }

      return nextIdx;
    });
  };

  const handleIncorrectClick = (flashcard) => {
    setIncorrectCount(incorrectCount + 1);
    const updatedQuestions = [...questions];
    const flashcardToMove = updatedQuestions.splice(currentIndex, 1)[0];
    updatedQuestions.push(flashcardToMove);
    setQuestions(updatedQuestions);
  };

  const startSession = () => {
    setShowInfo(false);
    setShowSessionView(true);
  };

  const infoView = () => {
    return (
      <Box
        component="section"
        p={5}
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          background: "#fff",
          borderRadius: 5,
          width: { xs: "100%", sm: "100%", md: "60%" },
        }}
      >
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          <Typography mt={6} variant="h3" color="initial">
            {activeSession.title}
          </Typography>
          <Typography mt={6} variant="h5" color="initial">
            {dayjs(new Date(activeSession.startDate))
              .utc()
              .format("MM/DD/YYYY")}
            {" - " +
              dayjs(new Date(activeSession.endDate)).utc().format("MM/DD/YYYY")}
          </Typography>
          {questions.length === 0 ? (
            <Typography mt={6} variant="h5" color="initial">
              This review session does not contain flashcards.
            </Typography>
          ) : isSessionDate ? (
            <Button onClick={startSession} variant="contained" color="success">
              Start review session
            </Button>
          ) : (
            <>
              <Typography mt={6} variant="h5" color="initial">
                Today is not an assigned review date!
              </Typography>
              <Button
                onClick={startSession}
                variant="contained"
                color="success"
              >
                Practice all cards
              </Button>
            </>
          )}
        </Stack>
      </Box>
    );
  };

  const summaryView = () => {
    return (
      <Box
        component="section"
        p={5}
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          background: "#fff",
          borderRadius: 5,
          width: { xs: "100%", sm: "100%", md: "60%" },
        }}
      >
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          <Typography mt={6} variant="h3" color="initial">
            {activeSession.title}
          </Typography>
          <Typography mt={6} variant="h5" color="initial">
            Summary
          </Typography>
          <Typography mt={6} variant="h5" color="green">
            Knew : {correctCount}
          </Typography>
          <Typography mt={6} variant="h5" color="red">
            Did not know : {incorrectCount}
          </Typography>
        </Stack>
      </Box>
    );
  };

  const sessionView = () => {
    return (
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <Typography mt={6} variant="h3" color="initial">
            {activeSession && activeSession.title}
          </Typography>
        </Grid>
        <Grid item xs={12} md={12}>
          <Typography variant="h5" color="initial">
            {currentIndex + 1} / {questions.length}
          </Typography>
        </Grid>
        <Grid item xs={12} md={2}></Grid>
        <Grid item xs={12} md={8}>
          {questions.length > 0 && (
            <CardFlip
              mt={5}
              isFlipped={questions[currentIndex].id === flippedCardId}
              flipDirection="vertical"
            >
              <ActionCard
                mt={5}
                key={"front"}
                content={
                  <Typography my={4} variant="h6" align="center">
                    {questions[currentIndex].question}
                  </Typography>
                }
                onClick={() => handleFlashcardClick(questions[currentIndex])}
              />
              <ActionCard
                mt={5}
                key={"back"}
                content={
                  <Typography my={4} variant="h6" align="center">
                    {questions[currentIndex].answer}
                  </Typography>
                }
                onClick={() => handleFlashcardClick(questions[currentIndex])}
              />
            </CardFlip>
          )}
        </Grid>
        <Grid item xs={12} md={2}></Grid>
        <Grid item xs={12} md={2}></Grid>
        <Grid item xs={12} md={4}>
          <Button
            fullWidth
            onClick={handleIncorrectClick}
            variant="contained"
            sx={{
              textDecoration: "none",
              color: "#fc4444",
              bgcolor: "#fff",
              ":hover": {
                bgcolor: "#fc4444",
                color: "#fff",
                border: "none",
              },
            }}
            size="large"
          >
            <Stack
              direction="column"
              justifyContent="center"
              alignItems="center"
            >
              <CancelOutlinedIcon style={{ fontSize: 80 }} />
              <Typography variant="h4">I dont know the answer!</Typography>
            </Stack>
          </Button>
        </Grid>
        <Grid item xs={12} md={4}>
          <Button
            onClick={handleCorrectClick}
            fullWidth
            sx={{
              textDecoration: "none",
              color: "#32a852",
              bgcolor: "#fff",
              ":hover": {
                bgcolor: "#32a852",
                color: "#fff",
                border: "none",
              },
            }}
            variant="contained"
            size="large"
          >
            <Stack
              direction="column"
              justifyContent="center"
              alignItems="center"
            >
              <CheckCircleOutlineIcon style={{ fontSize: 80 }} />
              <Typography variant="h4">I know the answer!</Typography>
            </Stack>
          </Button>
        </Grid>
        <Grid item xs={12} md={2}></Grid>
      </Grid>
    );
  };

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {showInfo && infoView()}
      {showSessionView && sessionView()}
      {showSummaryView && summaryView()}
    </Container>
  );
};

export default Session;

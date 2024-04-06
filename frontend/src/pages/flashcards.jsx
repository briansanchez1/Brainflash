import React, { useState, useEffect } from "react";
import { Grid, Typography, Container, TextField, Box } from "@mui/material";
import FlashcardCard from "../components/flashcard_card";
import { apiFlashcards } from "../helpers/axios_helper";


const FlashcardsGrid = () => {
    const [flashcards, setFlashcards] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        // Fetch all flashcards when the component mounts
        apiFlashcards
            .getAllFlashcards()
            .then((response) => {
                setFlashcards(response.data); // Set the flashcards in state
            })
            .catch((error) => {
                console.error("Error fetching flashcards:", error);
            });
    }, []);

    // Handles search change
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    // Updates filtered flashcards
    const filteredFlashcards = flashcards.filter((flashcard) =>
        flashcard.question.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Container>
            <Typography sx={{ my: 4, textAlign: "left" }} variant="h4">
                Flashcards
            </Typography>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                }}
            >
                <TextField
                    label="Search"
                    variant="outlined"
                    sx={{
                        mb: 4,
                        width: {
                            xs: "100%",
                            sm: "100%",
                            md: "100%",
                            lg: "100%",
                            xl: "25%",
                        },
                    }}
                    onChange={handleSearchChange}
                />
            </Box>
            <Grid container spacing={2} sx={{ pb: 4 }}>
                {filteredFlashcards.length > 0 ? (
                    filteredFlashcards.map((flashcard) => (
                        <Grid item key={flashcard.id} xs={12} sm={6} md={4} lg={3} xl={3}>
                            <FlashcardCard flashcard={flashcard} />
                        </Grid>
                    ))
                ) : (
                    <Typography
                        sx={{
                            width: {
                                xs: "100%",
                            },
                        }}
                        variant="h8"
                    >
                        No flashcards found.
                    </Typography>
                )}
            </Grid>
        </Container>
    );
};

export default FlashcardsGrid;
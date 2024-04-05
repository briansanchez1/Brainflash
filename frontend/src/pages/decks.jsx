import React, { useState, useEffect } from 'react';
import { Grid, Typography, Container, TextField, Box } from '@mui/material';
import DeckCard from '../components/deck_card';
import { apiDecks } from '../helpers/axios_helper';

const DecksGrid = () => {
    const [decks, setDecks] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    // Fetch all decks
    useEffect(() => {
        apiDecks.getAllDecks()
        .then((response) => {
            setDecks(response.data);
        })
        .catch((error) => {
            console.error("Error fetching decks:", error);
        });
    }, []);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredDecks = decks.filter((deck) => {
        return deck.title.toLowerCase().includes(searchTerm.toLowerCase());
    });

    return (
        <Container>
            <Typography sx={{ my:4, textAlign: "left" }} variant="h4">
                Decks
            </Typography>

            <Box sx={{ 
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
             }}>
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
                        }
                     }}
                    onChange={handleSearchChange}
                />
             </Box>

             <Grid container spacing={2} sx={{ pb: 4 }}>
                {filteredDecks.length > 0 ? (
                    filteredDecks.map((deck) => (
                        <Grid item key={deck.id} xs={12} sm={6} md={4} lg={3} xl={3}>
                            <DeckCard deck={deck} />
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
                        No decks found.
                    </Typography>
                
                )}
             </Grid>
        </Container>
    );
};

export default DecksGrid;
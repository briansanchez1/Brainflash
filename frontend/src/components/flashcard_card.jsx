import * as React from "react";
import Typography from "@mui/material/Typography";
import { CardContent, Card, CardActionArea } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Flashcard_card({ flashcard }) {
    const navigate = useNavigate();

    const HandleClick = (flashcard) => {
        navigate(`/flashcards/${flashcard.id}`);
    };

    return (
        <Card>
            <CardActionArea onClick={() => HandleClick(flashcard)}>
                <CardContent>
                <Typography variant="h6" component="h2" align="center">
                    {flashcard.question}
                </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
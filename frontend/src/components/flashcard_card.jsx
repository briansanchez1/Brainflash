import * as React from "react";
import Typography from "@mui/material/Typography";
import { CardContent, Card, CardActionArea } from "@mui/material";
import { useState } from "react";

export default function Flashcard_full_card({ flashcard }) {
    const [flipped, setFlipped] = useState(false);

    // Handles click event
    const handleClick = () => {
        setFlipped(!flipped);
    };

    return (
        <Card>
            <CardActionArea onClick={handleClick}>
                <CardContent>
                    <Typography variant="h6" component="h2" align="center">
                        {flipped ? "A: " + flashcard.answer : "Q: " + flashcard.question}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
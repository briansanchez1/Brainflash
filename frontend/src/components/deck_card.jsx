import * as React from 'react';
import Typography from '@mui/material/Typography';
import { Card, CardContent, CardActionArea } from '@mui/material';

const handleClick = (deck) => {
    console.log("Clicked deck:", deck);
}

export default function deck_card({ deck }) {
    return (
        <Card>
            <CardActionArea onClick={() => handleClick(deck)}>
                <CardContent>
                    <Typography variant="h5" component="div">
                        {deck.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {deck.numCards}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
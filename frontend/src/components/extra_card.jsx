import React from "react";
import Typography from "@mui/material/Typography";
import { CardContent, Card, CardActionArea } from "@mui/material";
import { useNavigate } from "react-router-dom";

// Rename the component to start with an uppercase letter
const ExtraCard = ({ extra, navTo }) => {
  const nav = useNavigate();

  const handleClick = () => {
    nav(navTo); // Remove curly braces around navTo
  };

  return (
    <Card>
      <CardActionArea onClick={handleClick}>
        <CardContent>
          <Typography variant="h6" component="h2" align="center">
            {extra.title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ExtraCard; // Export the component with the updated name

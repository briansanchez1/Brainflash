import * as React from "react";
import Typography from "@mui/material/Typography";
import { CardContent, Card, CardActionArea } from "@mui/material";

const handleClick = (pfe) => {
  console.log("Clicked category:", pfe);
};

export default function pfe_card({ pfe }) {
  return (
    <Card>
      <CardActionArea onClick={() => handleClick(pfe)}>
        <CardContent>
          <Typography variant="h6" component="h2" align="center">
            {pfe.title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

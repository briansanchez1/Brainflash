import * as React from "react";
import Typography from "@mui/material/Typography";
import { CardContent, Card } from "@mui/material";

export default function card_component({ title, cardNum }) {
  return (
    <div>
      <Card
        sx={{
          width: {xs: "150px",lg: "250px"},
          height: {xs: "100px",lg:"200px"},
          border: "1px solid black",

          ":hover": {
            cursor: "pointer",
          },
        }}
      >
        <CardContent>
          <Typography variant="h5" component="div">
            {title}
          </Typography>

          {/* Eventually, category will pass number of cards }
          <Typography sx={{ mt: 3 }} color="#797979">
           {cardNum}
          </Typography> */}
        </CardContent>
      </Card>
    </div>
  );
}

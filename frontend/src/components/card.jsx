import * as React from "react";
import Typography from "@mui/material/Typography";
import { CardContent, Card, CardActionArea } from "@mui/material";

const handleClick = (category) => {
  // Handle click event, for example, navigate to a category detail page
  console.log("Clicked category:", category);
};

export default function category_card({ category }) {
  return (
    <Card>
      <CardActionArea onClick={() => handleClick(category)}>
        <CardContent>
          <Typography variant="h6" component="h2" align="center">
            {category.name}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

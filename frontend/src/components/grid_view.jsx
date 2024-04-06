import React, { useState, useEffect } from "react";
import { Grid, Typography } from "@mui/material";
import ActionCard, { CardAction } from "../components/action_card";

const CardGridView = ({
  itemName,
  items,
  cardContent,
  onCardClick,
  onCardEdit,
  onCardDelete,
}) => {
  const [gridItems, setGridItems] = useState(items);

  useEffect(() => {
    setGridItems(items);
  }, [items]);

  return (
    <Grid container spacing={2} sx={{ pb: 4 }}>
      {gridItems.length > 0 ? (
        gridItems.map((item) => (
          <Grid item key={item.id} xs={12} sm={6} md={4} lg={3} xl={3}>
            <ActionCard
              content={cardContent(item)}
              onClick={() => onCardClick(item)}
              actions={[
                <CardAction
                  key="edit"
                  label="Edit"
                  onClick={() => onCardEdit(item)}
                />,
                <CardAction
                  key="delete"
                  label="Delete"
                  onClick={() => onCardDelete(item)}
                />,
              ]}
            />
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
          No {itemName.toLowerCase()} found.
        </Typography>
      )}
    </Grid>
  );
};

export default CardGridView;

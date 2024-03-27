import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Add } from "@mui/icons-material";
import {
  Grid,
  TextField,
  Select,
  ToggleButtonGroup,
  ToggleButton,
  Stack,
  MenuItem,
  Chip,
  OutlinedInput, 
} from "@mui/material";


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: 250, sm: 350, md: 500, lg: 700 },
  height: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const btnStyle = {
  color: "black",
  fontWeight: "600",
  width: { xs: 150, sm: 250, md: 400, lg: 700 },
  fontSize: { xs: 10, md: 15, lg: 15 },
};

export default function ModalComponent() {
  const [active, setActive] = useState("flashcard");
  const [open, setOpen] = useState(false);
  const [deck, setDeck] = React.useState("");
  const [personName, setPersonName] = React.useState([]);
  const names = [
    "Deck 1",
    "Deck 2",
    "Deck 3",
    "Deck 4",
    "Deck 5",
    "Deck 6",
    "Deck 7",
    "Deck 8",
    "Deck 9",
    "Deck 10",
    "Deck 11",
  ];
  const handleChange = (event, newActive) => {
    if (newActive !== null) {
      setActive(newActive);
    }
  };

  const handleChangeSelect = (event) => {
    setDeck(event.target.value);
  };
  const handleChangeChip = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      typeof value === "string" ? value.split(",") : value
    );
  };
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setActive("flashcard");
  };

  const handleSubmit = () => setOpen(false);

  const children = [
    <ToggleButton
      value="flashcard"
      key="flashcard"
      color="primary"
      sx={btnStyle}
    >
      Flashcard
    </ToggleButton>,
    <ToggleButton value="deck" key="deck" color="primary" sx={btnStyle}>
      Deck
    </ToggleButton>,
    <ToggleButton value="category" key="category" color="primary" sx={btnStyle}>
      Category
    </ToggleButton>,
    <ToggleButton value="review" key="review" color="primary" sx={btnStyle}>
      Review
    </ToggleButton>,
  ];

  const control = {
    value: active,
    onChange: handleChange,
    exclusive: true,
  };

  return (
    <div>
      <Button
        onClick={handleOpen}
        sx={{ textDecoration: "none", color: "#fff" }}
      >
        <Add />
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Stack spacing={2}>
            <Typography
              id="modal-modal-title"
              variant="h4"
              textAlign={"center"}
            >
              What would you like to create?
            </Typography>
            <ToggleButtonGroup
              {...control}
              sx={{ justifyContent: "center", color: "black" }}
            >
              {children}
            </ToggleButtonGroup>
            <Grid container spacing={2}>
              {/* eventually we want these to be Chip and not Select */}

              {active === "flashcard" && (
                <Grid item xs={11} alignContent={"center"}>
                  <TextField
                    required
                    fullWidth
                    label="Enter Question"
                    name="Question"
                    autoFocus
                  />

                  <TextField
                    required
                    fullWidth
                    label="Enter Answer"
                    name="Answer"
                    sx={{ mt: 3 }}
                  />

                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={deck}
                    label="deck"
                    required
                    onChange={handleChangeSelect}
                    sx={{ width: 340, mt: 3 }}
                  >
                    <MenuItem value={"None"}>None</MenuItem>

                    <MenuItem value={"deck 1"}>Deck 1</MenuItem>
                  </Select>
                </Grid>
              )}
              {active === "deck" && (
                <Grid
                  item
                  xs={11}
                  alignContent={"center"}
                  justifyContent={"space-between"}
                >
                  <TextField
                    required
                    fullWidth
                    label="Enter Deck Name"
                    name="deckName"
                    autoFocus
                  />
                  <Select
                    labelId="demo-multiple-chip-label"
                    id="demo-multiple-chip"
                    multiple
                    sx={{ mt: 3 }}
                    onChange={handleChangeChip}
                    value={personName}
                    input={
                      <OutlinedInput id="select-multiple-chip" label="Chip" />
                    }
                    renderValue={(selected) => (
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                        {selected.map((value) => (
                          <Chip key={value} label={value} />
                        ))}
                      </Box>
                    )}
                  >
                    {names.map((name) => (
                      <MenuItem key={name} value={name}>
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
              )}
              {active === "category" && (
                <Grid
                  item
                  xs={11}
                  alignContent={"center"}
                  justifyContent={"space-between"}
                >
                  <TextField
                    required
                    fullWidth
                    label="Enter Question"
                    name="Question"
                    autoFocus
                  />

                  <Select
                    labelId="demo-multiple-chip-label"
                    id="demo-multiple-chip"
                    multiple
                    sx={{ mt: 3 }}
                    onChange={handleChangeChip}
                    value={personName}
                    input={
                      <OutlinedInput id="select-multiple-chip" label="Chip" />
                    }
                    renderValue={(selected) => (
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                        {selected.map((value) => (
                          <Chip key={value} label={value} />
                        ))}
                      </Box>
                    )}
                  >
                    {names.map((name) => (
                      <MenuItem key={name} value={name}>
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
              )}
              {active === "review" && (
                <Grid
                  item
                  xs={11}
                  alignContent={"center"}
                  justifyContent={"space-between"}
                >
                  <TextField
                    required
                    fullWidth
                    label="Review Session Name"
                    name="reviewName"
                    autoFocus
                  />

                </Grid>
              )}
            </Grid>

            <Grid item xs={12} textAlign={"center"}>
              <Button
                variant="contained"
                onClick={handleSubmit}
              >
                Create
              </Button>
            </Grid>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}

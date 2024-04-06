import * as React from "react";
import {
  TextField,
  Autocomplete,
  Stack,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import { BasicDatePicker } from "../text_fields";
import { useState } from "react";
import dayjs from "dayjs";
import { useEffect } from "react";
import { apiDecks, apiCategories } from "../../helpers/axios_helper";
import utc from "dayjs/plugin/utc";

export default function PFEView({ session, onSessionEdit }) {
  const [active, setActive] = useState("");
  const [selections, setSelections] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [decks, setDecks] = useState(null);
  const [categories, setCategories] = useState(null);
  const [editedTitle, setEditedTitle] = useState(null);
  const [editedSession, setEditedSession] = useState({});

  dayjs.extend(utc);

  const handleClearSelection = () => {
    setSelectedOption(null);
  };

  const handleSessionChange = (event) => {
    const { name, value } = event.target;
    editedSession[name] = value;
    onSessionEdit(editedSession);
  };

  const handleChange = (event, newActive) => {
    if (newActive !== null) {
      setActive(newActive);
      if (newActive === "Deck") {
        setSelections(decks);
      } else {
        setSelections(categories);
      }
      handleClearSelection();
    }
  };

  const preSelectDeckSession = (deckData) => {
    if (session && session.deckId) {
      deckData.map((d) => {
        if (session.deckId === d.id) {
          setSelectedOption(d);
          setActive("Deck");
          setSelections(deckData);
        }
        return d;
      });
    }
  };

  const preSelectCategorySession = (categoriesData) => {
    if (session && session.categoryId) {
      categoriesData.map((c) => {
        if (session.categoryId === c.id) {
          setSelectedOption(c);
          setActive("Category");
          setSelections(categoriesData);
        }
        return c;
      });
    }
  };

  useEffect(() => {
    // Fetch all decks when the component mounts
    apiDecks
      .getAllDecks()
      .then((response) => {
        const deckData = response.data.map((d) => {
          d.label = d.title;
          d.deckId = d.id;
          return d;
        });
        setDecks(deckData); // Set the decks in state
        preSelectDeckSession(deckData);
      })
      .catch((error) => {
        console.error("Error fetching decks:", error);
      });

    // Fetch all categories when the component mounts
    apiCategories
      .getAllCategories()
      .then((response) => {
        const catData = response.data.map((d) => {
          d.label = d.title;
          d.categoryId = d.id;
          return d;
        });
        setCategories(catData);
        preSelectCategorySession(catData);
      })
      .catch((error) => {
        console.error("Error fetching decks:", error);
      });

    // Set dates on edit

    if (session) {
      setEditedSession({ ...session });
      //setStartDate(dayjs(new Date(session.startDate)));
      //setEndDate(dayjs(new Date(session.endDate)));
    }
  }, []);

  const control = {
    value: active,
    onChange: handleChange,
    exclusive: true,
  };

  const children = [
    <ToggleButton value="Deck" key="Deck" color="primary">
      Deck
    </ToggleButton>,
    <ToggleButton value="Category" key="Category" color="primary">
      Category
    </ToggleButton>,
  ];
  return (
    <Stack spacing={2} container xs={11} alignContent={"center"}>
      <TextField
        required
        fullWidth
        label="Session name"
        name="title"
        defaultValue={session && session.title}
        value={editedTitle}
        onChange={(event) => {
          handleSessionChange(event);
        }}
        autoFocus
      />
      <BasicDatePicker
        defaultValue={session && dayjs(new Date(session.startDate))}
        label="Start Date"
        name="startDate"
        onChange={(newValue) =>
          handleSessionChange({
            target: {
              name: "startDate",
              value: dayjs(newValue).utc().format("YYYY-MM-DD"),
            },
          })
        }
      ></BasicDatePicker>
      <BasicDatePicker
        defaultValue={session && dayjs(new Date(session.endDate))}
        label="End Date"
        onChange={(newValue) =>
          handleSessionChange({
            target: {
              name: "endDate",
              value: dayjs(newValue).utc().format("YYYY-MM-DD"),
            },
          })
        }
      ></BasicDatePicker>

      <ToggleButtonGroup
        {...control}
        sx={{ justifyContent: "center", color: "black" }}
      >
        {children}
      </ToggleButtonGroup>

      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={selections}
        value={selectedOption}
        onChange={(event, newValue) => {
          setSelectedOption(newValue);
          handleSessionChange({
            target: {
              name: newValue.categoryId ? "categoryId" : "deckId",
              value: newValue.id,
            },
          });

          handleSessionChange({
            target: {
              name: !newValue.categoryId ? "categoryId" : "deckId",
              value: null,
            },
          });
        }}
        renderInput={(params) => <TextField {...params} label={active} />}
      />
    </Stack>
  );
}

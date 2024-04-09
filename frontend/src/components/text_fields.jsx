import { Box, TextField } from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export function SearchField({ onSearch, fullWidth }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
      }}
    >
      <TextField
        label="Search"
        variant="outlined"
        fullWidth
        sx={{
          mb: 4,
          width: {
            xs: "100%",
            sm: "100%",
            md: "100%",
            lg: "100%",
            xl: fullWidth ? "100%" : "25%",
          },
        }}
        onChange={(event) => onSearch(event)}
      />
    </Box>
  );
}

export function BasicDatePicker({ label, defaultValue, onChange, name }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DatePicker"]}>
        <DatePicker
          label={label}
          name={name}
          disablePast={true}
          onChange={(newValue) => onChange(newValue)}
          defaultValue={defaultValue}
          inputFormat="YYYY-MM-DD"
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}

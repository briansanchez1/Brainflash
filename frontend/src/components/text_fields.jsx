import { Box, TextField } from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export function SearchField({ onSearch }) {
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
        sx={{
          mb: 4,
          width: {
            xs: "100%",
            sm: "100%",
            md: "100%",
            lg: "100%",
            xl: "25%",
          },
        }}
        onChange={(event) => onSearch(event)}
      />
    </Box>
  );
}

export function BasicDatePicker({ label, value, onChange, name, minDate }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} >
      <DemoContainer components={["DatePicker"]}>
        <DatePicker
          sx={{width:"100%"}}
          label={label}
          name={name}
          disablePast={true}
          minDate={minDate}
          onChange={(newValue) => onChange(newValue)}
          value={value}
          inputFormat="YYYY-MM-DD"
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}

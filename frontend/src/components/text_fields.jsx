import { Box, TextField, ThemeProvider, createTheme } from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: "#E6A4B4",
    },
  },
});

export function SearchField({ onSearch }) {
  return (
    <ThemeProvider theme={defaultTheme}>
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
            bgcolor: "#fff",
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
    </ThemeProvider>
  );
}

export function BasicDatePicker({
  label,
  defaultValue,
  onChange,
  name,
  minDate,
}) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DatePicker"]}>
        <DatePicker
          label={label}
          name={name}
          disablePast={true}
          minDate={minDate}
          onChange={(newValue) => onChange(newValue)}
          defaultValue={defaultValue}
          inputFormat="YYYY-MM-DD"
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}

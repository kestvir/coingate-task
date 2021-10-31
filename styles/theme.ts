import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: {
      main: "#16dfb5",
    },
    secondary: {
      main: "#5022ed",
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;

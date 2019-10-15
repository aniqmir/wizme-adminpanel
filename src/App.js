import React from "react";
import CustomRoutes from "./routes";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

const theme = createMuiTheme({
  typography: {
    fontFamily: ["Aleo"].join(",")
  }
  // palette: {
  //   secondary: {
  //     main: "#FFB6C1",
  //     contrastText: "#FFF"
  //   }
  // }
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CustomRoutes />
    </ThemeProvider>
  );
}

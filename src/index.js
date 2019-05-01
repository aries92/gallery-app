import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Gallery from "./Gallery/Gallery";
import registerServiceWorker from "./registerServiceWorker";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import purple from "@material-ui/core/colors/purple";
import { MessageProvider } from "./Gallery/context/MessageContext";

const theme = createMuiTheme({
  palette: {
    primary: { main: purple[400] }
  }
});

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <MessageProvider>
      <Gallery />
    </MessageProvider>
    ,
  </MuiThemeProvider>,
  document.getElementById("root")
);
registerServiceWorker();

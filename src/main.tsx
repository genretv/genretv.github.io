import { CssBaseline, ThemeProvider } from "@mui/material";
import React from "react";
import * as ReactDOMClient from "react-dom/client";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import App from "./App";
import { store } from "./app/store";
import "./index.css";
import theme from "./theme";

// import process from "process";
// import { Buffer } from "buffer";
// import EventEmitter from "events";

// window.Buffer = Buffer;
// window.process = process;
// // window.EventEmitter = EventEmitter;
//
// globalThis.global = globalThis;
// aws-sdk requires global to exist
// (window as any).global = window;

const container = document.getElementById("root");
if (container) {
  const root = ReactDOMClient.createRoot(container);
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <PersistGate persistor={persistStore(store)}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <App />
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </React.StrictMode>
  );
}

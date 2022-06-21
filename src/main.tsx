import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";

import "./index.css";

import { store } from "./app/store";
import { invoke } from "@tauri-apps/api/tauri";
import { loadSettings, SettingsState } from "./features/settings/settingsSlice";
import { BrowserRouter } from "react-router-dom";

invoke<SettingsState>("load_settings").then((settingsState) => {
  console.log(settingsState);
  store.dispatch(loadSettings(settingsState));
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

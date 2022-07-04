import React from "react";
import ReactDOM from "react-dom/client";
import { createStoreHook, Provider } from "react-redux";
import App from "./App";

import "./index.css";

import { store } from "./app/store";
import { invoke } from "@tauri-apps/api/tauri";
import { loadSettings, SettingsState } from "./features/settings/settingsSlice";
import { BrowserRouter } from "react-router-dom";
import { initializeConcept } from "./features/concept/conceptsSlice";

invoke<SettingsState>("load_settings").then((settingsState) => {
  store.dispatch(loadSettings(settingsState));
  Object.keys(settingsState.concepts).forEach((conceptKey) => {
    const concept = settingsState.concepts[conceptKey];
    const stores = Object.keys(concept.stores).map((storeKey) => ({
      id: concept.stores[storeKey].id,
      name: concept.stores[storeKey].name,
    }));

    store.dispatch(
      initializeConcept({
        conceptId: conceptKey,
        selectedStore: concept.source,
        stores,
      })
    );
  });
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

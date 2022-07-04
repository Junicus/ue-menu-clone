import { createSlice } from "@reduxjs/toolkit";
import { addStoreAction } from "./actions/addStoreAction";
import { renewTokenAction } from "./actions/renewTokenAction";

import addConceptReducer from "./reducers/addConceptReducer";
import addStoreReducer from "./reducers/addStoreReducer";
import deleteConceptReducer from "./reducers/deleteConceptReducer";
import loadSettingsReducer from "./reducers/loadSettingsReducer";
import updateClientIdReducer from "./reducers/updateClientIdReducer";
import updateClientSecretReducer from "./reducers/updateClientSecretReducer";
import updateConceptDefaultStoreReducer from "./reducers/updateConceptDefaultStoreReducer";
import updateStoreReducer from "./reducers/updateStoreReducer";

export interface UEToken {
  access_token: string;
  expires_in: number;
  expires_at: number;
  token_type: string;
  scope: string;
}

export interface UESettings {
  client_id: string;
  client_secret: string;
  token?: UEToken;
  tokenStatus: "loading" | "idle";
  error: string | null;
}

export interface Concept {
  id: string;
  name: string;
  label: string;
  source?: string;
  stores: Record<string, Store>;
}

export interface Store {
  id: string;
  name: string;
  uberId: string;
}

export interface SettingsState {
  ueSettings: UESettings;
  concepts: Record<string, Concept>;
}

const initialState: SettingsState = {
  ueSettings: {
    client_id: "",
    client_secret: "",
    error: null,
    tokenStatus: "idle",
  },
  concepts: {},
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    loadSettings: loadSettingsReducer,
    updateClientId: updateClientIdReducer,
    updateClientSecret: updateClientSecretReducer,
    addConcept: addConceptReducer,
    deleteConcept: deleteConceptReducer,
    updateConceptDefaultStore: updateConceptDefaultStoreReducer,
    addStore: addStoreReducer,
    updateStore: updateStoreReducer,
  },
  extraReducers: (builder) => {
    builder.addCase(renewTokenAction.pending, (state) => {
      state.ueSettings.tokenStatus = "loading";
      state.ueSettings.error = null;
    });

    builder.addCase(renewTokenAction.fulfilled, (state, { payload }) => {
      state.ueSettings.token = payload;
      state.ueSettings.tokenStatus = "idle";
      state.ueSettings.error = null;
    });

    builder.addCase(renewTokenAction.rejected, (state, { payload }) => {
      if (payload) state.ueSettings.error = payload.message;
      state.ueSettings.tokenStatus = "idle";
    });
  },
});

export const {
  loadSettings,
  updateClientId,
  updateClientSecret,
  addConcept,
  deleteConcept,
  updateConceptDefaultStore,
  addStore,
  updateStore,
} = settingsSlice.actions;
export default settingsSlice.reducer;

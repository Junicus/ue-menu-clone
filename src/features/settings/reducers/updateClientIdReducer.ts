import { PayloadAction } from "@reduxjs/toolkit";
import { SettingsState } from "../settingsSlice";

export default function updateClientIdReducer(
  state: SettingsState,
  action: PayloadAction<string>
) {
  state.ueSettings.client_id = action.payload;
}

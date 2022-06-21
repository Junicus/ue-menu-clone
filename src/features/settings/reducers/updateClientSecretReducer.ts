import { PayloadAction } from "@reduxjs/toolkit";
import { SettingsState } from "../settingsSlice";

export default function updateClientSecretReducer(
  state: SettingsState,
  action: PayloadAction<string>
) {
  state.ueSettings.client_secret = action.payload;
}

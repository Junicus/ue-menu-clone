import { PayloadAction } from "@reduxjs/toolkit";
import { SettingsState } from "../settingsSlice";

export default function loadSettings(
  state: SettingsState,
  action: PayloadAction<SettingsState | null>
) {
  if (action.payload) {
    Object.assign(state, action.payload);
  }
}

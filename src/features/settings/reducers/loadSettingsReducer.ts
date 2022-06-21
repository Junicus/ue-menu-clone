import { PayloadAction } from "@reduxjs/toolkit";
import { SettingsState } from "../settingsSlice";

export default function loadSettings(
  state: SettingsState,
  action: PayloadAction<SettingsState | null>
) {
  if (action.payload) {
    state.ueSettings = { ...action.payload.ueSettings };
  }
}

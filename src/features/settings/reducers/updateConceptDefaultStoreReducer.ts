import { PayloadAction } from "@reduxjs/toolkit";
import { SettingsState } from "../settingsSlice";

type UpdateConceptDefaultStorePayload = {
  conceptId: string;
  storeId: string;
};

export default function updateConceptDefaultStoreReducer(
  state: SettingsState,
  action: PayloadAction<UpdateConceptDefaultStorePayload>
) {
  state.concepts[action.payload.conceptId].source = action.payload.storeId;
}

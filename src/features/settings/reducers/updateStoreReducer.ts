import { PayloadAction } from "@reduxjs/toolkit";
import { SettingsState } from "../settingsSlice";

type UpdateStoreReducerPayload = {
  conceptId: string;
  storeId: string;
  name: string;
  uberId: string;
};

export default function updateStoreReducer(
  state: SettingsState,
  action: PayloadAction<UpdateStoreReducerPayload>
) {
  state.concepts[action.payload.conceptId].stores[action.payload.storeId].name =
    action.payload.name;
  state.concepts[action.payload.conceptId].stores[
    action.payload.storeId
  ].uberId = action.payload.uberId;
}

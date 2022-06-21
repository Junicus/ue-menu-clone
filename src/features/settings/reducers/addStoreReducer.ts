import { PayloadAction } from "@reduxjs/toolkit";
import { Store, SettingsState } from "../settingsSlice";

export type StorePayload = Omit<Required<Store>, "source"> & {
  conceptId: string;
};

export default function addStoreReducer(
  state: SettingsState,
  action: PayloadAction<StorePayload>
) {
  if (
    Object.keys(state.concepts[action.payload.conceptId].stores).length === 0
  ) {
    state.concepts[action.payload.conceptId].source = action.payload.id;
  }

  state.concepts[action.payload.conceptId].stores[action.payload.id] = {
    id: action.payload.id,
    name: action.payload.name,
    uberId: action.payload.uberId,
  };
}

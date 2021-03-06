import { PayloadAction } from "@reduxjs/toolkit";
import { Concept, SettingsState } from "../settingsSlice";

export type ConceptPayload = Omit<Required<Concept>, "source" | "stores">;

export default function addConceptReducer(
  state: SettingsState,
  action: PayloadAction<ConceptPayload>
) {
  state.concepts[action.payload.id] = { ...action.payload, stores: {} };
}

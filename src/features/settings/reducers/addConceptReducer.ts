import { PayloadAction } from "@reduxjs/toolkit";
import { Concept, SettingsState } from "../settingsSlice";

export type ConceptPayload = Omit<Required<Concept>, "source">;

export default function addConceptReducer(
  state: SettingsState,
  action: PayloadAction<ConceptPayload>
) {
  state.concepts[action.payload.id] = action.payload;
}

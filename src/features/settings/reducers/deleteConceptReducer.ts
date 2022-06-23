import { PayloadAction } from "@reduxjs/toolkit";
import { Concept, SettingsState } from "../settingsSlice";

export type ConceptPayload = Omit<Required<Concept>, "source" | "stores">;

export default function deleteConceptReducer(
  state: SettingsState,
  action: PayloadAction<string>
) {
  const concepts = { ...state.concepts };
  delete concepts[action.payload];
  state.concepts = { ...concepts };
}

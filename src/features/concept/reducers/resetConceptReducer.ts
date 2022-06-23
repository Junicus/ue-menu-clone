import { PayloadAction } from "@reduxjs/toolkit";
import { ConceptsState } from "../conceptsSlice";

interface ResetConceptPayload {
  conceptId: string;
}

export default function resetConceptReducer(
  state: ConceptsState,
  action: PayloadAction<ResetConceptPayload>
) {
  state[action.payload.conceptId].stores = {};
}

import { PayloadAction } from "@reduxjs/toolkit";
import { ConceptsState } from "../conceptsSlice";

interface SetSelectedStoreReducerPayload {
  conceptId: string;
  storeId: string;
}
export default function setSelectedStoreReducer(
  state: ConceptsState,
  action: PayloadAction<SetSelectedStoreReducerPayload>
) {
  state[action.payload.conceptId].selectedStore = action.payload.storeId;
}

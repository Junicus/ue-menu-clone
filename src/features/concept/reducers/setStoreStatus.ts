import { PayloadAction } from "@reduxjs/toolkit";
import { ConceptsState } from "../conceptsSlice";

interface SetStoreStatusReducerPayload {
  conceptId: string;
  storeId: string;
  status: "idle" | "cloning" | "success" | "failed";
}
export default function setStoreStatusReducer(
  state: ConceptsState,
  action: PayloadAction<SetStoreStatusReducerPayload>
) {
  state[action.payload.conceptId].stores[action.payload.storeId].status =
    action.payload.status;
}

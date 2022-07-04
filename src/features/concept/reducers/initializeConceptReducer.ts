import { PayloadAction } from "@reduxjs/toolkit";
import addConceptReducer from "../../settings/reducers/addConceptReducer";
import { ConceptsState } from "../conceptsSlice";

interface Store {
  id: string;
  name: string;
}

interface InitializeConceptReducerPayload {
  conceptId: string;
  selectedStore: string | undefined;
  stores: Store[];
}

export default function initializeConceptReducer(
  state: ConceptsState,
  action: PayloadAction<InitializeConceptReducerPayload>
) {
  state[action.payload.conceptId] = {
    id: action.payload.conceptId,
    status: "idle",
    selectedStore: action.payload.selectedStore || "",
    stores: {},
  };
  action.payload.stores.forEach((store) => {
    state[action.payload.conceptId].stores[store.id] = {
      id: store.id,
      name: store.name,
      status: "idle",
    };
  });
}

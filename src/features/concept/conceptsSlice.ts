import { createSlice } from "@reduxjs/toolkit";
import { cloneStores } from "./actions/cloneStores";
import resetConceptReducer from "./reducers/resetConceptReducer";
import initializeConceptReducer from "./reducers/initializeConceptReducer";

export interface CloningStore {
  id: string;
  name: string;
  status: "idle" | "source" | "cloning" | "success" | "failed";
}

export interface ConceptState {
  id: string;
  status: "idle";
  stores: Record<string, CloningStore>;
}
export interface ConceptsState extends Record<string, ConceptState> {}

const initialState: ConceptsState = {};

const conceptsSlice = createSlice({
  name: "concept",
  initialState,
  reducers: {
    resetConcept: resetConceptReducer,
    initializeConcept: initializeConceptReducer,
  },
  extraReducers: (builder) => {},
});

export const { resetConcept, initializeConcept } = conceptsSlice.actions;
export default conceptsSlice.reducer;

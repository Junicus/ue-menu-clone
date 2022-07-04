import { createSlice } from "@reduxjs/toolkit";
import { cloneStores } from "./actions/cloneStores";
import initializeConceptReducer from "./reducers/initializeConceptReducer";
import setSelectedStoreReducer from "./reducers/setSelectedStoreReducer";

export interface CloningStore {
  id: string;
  name: string;
  status: "idle" | "source" | "cloning" | "success" | "failed";
}

export interface ConceptState {
  id: string;
  status: "idle" | "cloning";
  selectedStore: string;
  stores: Record<string, CloningStore>;
}
export interface ConceptsState extends Record<string, ConceptState> {}

const initialState: ConceptsState = {};

const conceptsSlice = createSlice({
  name: "concept",
  initialState,
  reducers: {
    initializeConcept: initializeConceptReducer,
    setSelectedStore: setSelectedStoreReducer,
  },
  extraReducers: (builder) => {
    builder.addCase(cloneStores.pending, (state, action) => {
      const { conceptId } = action.meta.arg;
      state[conceptId].status = "cloning";
    });

    builder.addCase(cloneStores.rejected, (state, action) => {
      const { conceptId } = action.meta.arg;
      (state[conceptId].status = "idle"), console.log(action.error);
    });
    builder.addCase(cloneStores.fulfilled, (state, action) => {
      const { conceptId } = action.meta.arg;
      state[conceptId].status = "idle";
    });
  },
});

export const { initializeConcept, setSelectedStore } = conceptsSlice.actions;
export default conceptsSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import { cloneStores } from "./actions/cloneStores";
import resetConceptReducer from "./reducers/resetConceptReducer";

export interface CloningStore {
  id: string;
  name: string;
  status: "idle" | "source" | "cloning" | "success" | "failed";
}
export interface CloningConcept {
  id: string;
  name: string;
  stores: Record<string, CloningStore>;
}

export interface ConceptState {
  concept?: CloningConcept;
  runningStatus: "idle" | "running";
  error: string | null;
}

const initialState: ConceptState = {
  runningStatus: "idle",
  error: null,
};

const conceptsSlice = createSlice({
  name: "concept",
  initialState,
  reducers: {
    resetConcept: resetConceptReducer,
  },
  extraReducers: (builder) => {
    builder.addCase(cloneStores.pending, (state) => {
      state.runningStatus = "running";
      state.error = null;
    });

    builder.addCase(cloneStores.fulfilled, (state) => {
      state.runningStatus = "idle";
      state.error = null;
    });

    builder.addCase(cloneStores.rejected, (state, { payload }) => {
      if (payload) state.error = payload.message;
      state.runningStatus = "idle";
    });
  },
});

export const { resetConcept } = conceptsSlice.actions;
export default conceptsSlice.reducer;

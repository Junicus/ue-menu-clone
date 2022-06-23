import { ConceptState } from "../conceptsSlice";

export default function resetConceptReducer(state: ConceptState) {
  delete state.concept;
  state.runningStatus = "idle";
  state.error = null;
}

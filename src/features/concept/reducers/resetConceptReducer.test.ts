import conceptsReducer, { ConceptsState, resetConcept } from "../conceptsSlice";

describe("resetConceptReducer tests", () => {
  it("should work", () => {
    const initialState: ConceptsState = {
      test: {
        id: "test",
        status: "idle",
        stores: { "123": { id: "123", name: "Test Store", status: "idle" } },
      },
    };
    const action = resetConcept({ conceptId: "test" });
    const result = conceptsReducer(initialState, action);
    expect(result["test"]).toEqual({ id: "test", status: "idle", stores: {} });
  });
});

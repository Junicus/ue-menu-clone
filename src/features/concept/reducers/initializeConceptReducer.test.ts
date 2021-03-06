import conceptsReducer, {
  ConceptsState,
  initializeConcept,
} from "../conceptsSlice";

describe("initializeConcept tests", () => {
  it("should work", () => {
    const initialState: ConceptsState = {};
    const action = initializeConcept({
      conceptId: "test",
      selectedStore: "123",
      stores: [{ id: "123", name: "Test Store" }],
    });
    const result = conceptsReducer(initialState, action);
    expect(result).toEqual({
      test: {
        id: "test",
        status: "idle",
        selectedStore: "123",
        stores: {
          "123": { id: "123", name: "Test Store", status: "idle" },
        },
      },
    });
  });
});

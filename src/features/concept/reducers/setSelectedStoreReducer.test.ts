import conceptsReducer, {
  ConceptsState,
  initializeConcept,
  setSelectedStore,
} from "../conceptsSlice";

describe("setSelectedStore tests", () => {
  it("should work", () => {
    const initialState: ConceptsState = {
      test: { id: "test", status: "idle", selectedStore: "", stores: {} },
    };
    const action = setSelectedStore({
      conceptId: "test",
      storeId: "123",
    });
    const result = conceptsReducer(initialState, action);
    expect(result).toEqual({
      test: {
        id: "test",
        status: "idle",
        selectedStore: "123",
        stores: {},
      },
    });
  });
});

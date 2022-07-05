import conceptsReducer, {
  ConceptsState,
  initializeConcept,
  setSelectedStore,
  setStoreStatus,
} from "../conceptsSlice";

describe("setStoreStatus tests", () => {
  it("should work", () => {
    const initialState: ConceptsState = {
      test: {
        id: "test",
        status: "idle",
        selectedStore: "store",
        stores: {
          "123": {
            id: "123",
            name: "123",
            status: "idle",
          },
        },
      },
    };
    const action = setStoreStatus({
      conceptId: "test",
      storeId: "123",
      status: "cloning",
    });
    const result = conceptsReducer(initialState, action);
    expect(result).toEqual({
      test: {
        id: "test",
        status: "idle",
        selectedStore: "store",
        stores: {
          "123": {
            id: "123",
            name: "123",
            status: "cloning",
          },
        },
      },
    });
  });
});

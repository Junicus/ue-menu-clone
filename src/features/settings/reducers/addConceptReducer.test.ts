import settingsReducer, { addConcept } from "../settingsSlice";

describe("addConcept reducer", () => {
  it("should set concept", () => {
    const initialState = undefined;
    const action = addConcept({
      id: "test",
      name: "Test Concept",
      label: "TC",
    });
    const result = settingsReducer(initialState, action);
    expect(result.concepts["test"]).toEqual({
      id: "test",
      name: "Test Concept",
      label: "TC",
      stores: {},
    });
  });
});

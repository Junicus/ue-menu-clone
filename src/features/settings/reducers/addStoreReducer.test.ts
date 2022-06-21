import settingsReducer, { addStore, SettingsState } from "../settingsSlice";

describe("addStore reducer", () => {
  it("should add store, and set source", () => {
    const initialState: SettingsState = {
      ueSettings: { client_id: "", client_secret: "" },
      concepts: {
        test: {
          id: "test",
          name: "Test Concept",
          label: "Test",
          stores: {},
        },
      },
    };

    const action = addStore({
      conceptId: "test",
      id: "test",
      name: "Test Store",
      uberId: "1234",
    });

    const result = settingsReducer(initialState, action);
    expect(result.concepts["test"]).toEqual({
      id: "test",
      name: "Test Concept",
      label: "Test",
      source: "test",
      stores: {
        test: {
          id: "test",
          name: "Test Store",
          uberId: "1234",
        },
      },
    });
  });

  it("should add store, and not change source when already set", () => {
    const initialState: SettingsState = {
      ueSettings: { client_id: "", client_secret: "" },
      concepts: {
        test: {
          id: "test",
          name: "Test Concept",
          label: "Test",
          source: "some",
          stores: {
            some: { id: "some", name: "Some Store", uberId: "123" },
          },
        },
      },
    };

    const action = addStore({
      conceptId: "test",
      id: "test",
      name: "Test Store",
      uberId: "1234",
    });

    const result = settingsReducer(initialState, action);
    expect(result.concepts["test"]).toEqual({
      id: "test",
      name: "Test Concept",
      label: "Test",
      source: "some",
      stores: {
        some: { id: "some", name: "Some Store", uberId: "123" },
        test: {
          id: "test",
          name: "Test Store",
          uberId: "1234",
        },
      },
    });
  });
});

import settingsReducer, { loadSettings } from "../settingsSlice";

describe("loadSettings reducer", () => {
  it("should return an initial state if tauri settings undefined", () => {
    const initialState = undefined;
    const action = loadSettings(null);
    const result = settingsReducer(initialState, action);
    expect(result).toEqual({
      ueSettings: {
        client_id: "",
        client_secret: "",
        tokenStatus: "idle",
        error: null,
      },
      concepts: {},
    });
  });

  it("should load settings from tauri", () => {
    const initialState = undefined;
    const action = loadSettings({
      ueSettings: {
        client_id: "TEST",
        client_secret: "TEST",
        tokenStatus: "idle",
        error: null,
      },
      concepts: {},
    });
    const result = settingsReducer(initialState, action);
    expect(result).toEqual({
      ueSettings: {
        client_id: "TEST",
        client_secret: "TEST",
        tokenStatus: "idle",
        error: null,
      },
      concepts: {},
    });
  });
});

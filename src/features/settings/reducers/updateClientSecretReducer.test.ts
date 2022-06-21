import settingsReducer, { updateClientSecret } from "../settingsSlice";

describe("updateClientSecret reducer", () => {
  it("should return the initial state when passed an empty action", () => {
    const initialState = undefined;
    const action = { type: "" };
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

  it("should update client secret", () => {
    const initialState = undefined;
    const action = updateClientSecret("TEST");
    const result = settingsReducer(initialState, action);
    expect(result.ueSettings.client_secret).toEqual("TEST");
  });
});

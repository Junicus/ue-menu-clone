import settingsReducer, { updateClientId } from "../settingsSlice";

describe("updateClientId reducer", () => {
  it("should update client id", () => {
    const initialState = undefined;
    const action = updateClientId("TEST");
    const result = settingsReducer(initialState, action);
    expect(result.ueSettings.client_id).toEqual("TEST");
  });
});

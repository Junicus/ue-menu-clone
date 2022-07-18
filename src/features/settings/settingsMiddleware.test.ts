import { RootState } from "../../app/store";
import { settingsMiddleware } from "./settingsMiddleware";
import { loadSettings, updateClientId } from "./settingsSlice";
import { mockIPC, clearMocks } from "@tauri-apps/api/mocks";

describe("settingsMiddleware tests", () => {
  afterEach(() => {
    clearMocks();
  });

  it("should not happen", () => {
    const invoke = jest.fn();
    const next = jest.fn();
    const store = { getState: jest.fn(), dispatch: jest.fn() };

    const action = loadSettings({
      ueSettings: {
        client_id: "",
        client_secret: "",
        tokenStatus: "idle",
        error: null,
      },
      concepts: {},
    });

    settingsMiddleware(invoke)(store)(next)(action);
    expect(store.getState.mock.calls).toEqual([]);
  });

  it("should not happen", () => {
    const invoke = jest.fn();
    const next = jest.fn();
    const store = {
      getState: jest.fn<RootState, any[]>(() => ({
        settings: {
          ueSettings: {
            client_id: "",
            client_secret: "",
            tokenStatus: "idle",
            error: null,
          },
          concepts: {},
        },
        concepts: {},
      })),
      dispatch: jest.fn(),
    };

    const action = updateClientId("TEST");

    settingsMiddleware(invoke)(store)(next)(action);
    expect(store.getState.mock.calls).toEqual([[]]);
    expect(invoke.mock.calls).toEqual([
      [
        "save_settings",
        {
          settingsState: JSON.stringify({
            ueSettings: {
              client_id: "",
              client_secret: "",
              tokenStatus: "idle",
              error: null,
            },
            concepts: {},
          }),
        },
      ],
    ]);
  });
});

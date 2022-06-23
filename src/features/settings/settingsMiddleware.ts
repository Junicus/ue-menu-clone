import { Middleware } from "@reduxjs/toolkit";
import { InvokeArgs } from "@tauri-apps/api/tauri";

type InvokeFunction<T> = (cmd: string, args?: InvokeArgs) => Promise<T>;

export function settingsMiddleware(
  invoke: InvokeFunction<unknown>
): Middleware {
  return (store) => (next) => (action) => {
    console.log(action);
    const result = next(action);
    if (typeof action === "object") {
      const reducerName = action.type.split("/")[0];
      const actionName = action.type.split("/")[1];

      if (reducerName === "settings" && actionName !== "loadSettings") {
        const state = store.getState();
        invoke("save_settings", {
          settingsState: JSON.stringify(state.settings),
        });
      }
    }
    return result;
  };
}

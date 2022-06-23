import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import logger from "redux-logger";
import { invoke } from "@tauri-apps/api/tauri";
import { settingsMiddleware } from "../features/settings/settingsMiddleware";
import settingsReducer from "../features/settings/settingsSlice";

export const store = configureStore({
  reducer: {
    settings: settingsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(settingsMiddleware(invoke), logger),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

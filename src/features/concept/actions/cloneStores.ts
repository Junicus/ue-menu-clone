import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../../../app/store";

type CloneStoresError = { message: string };
type CloneStoresArgs = {};

export const cloneStores = createAsyncThunk<
  undefined,
  CloneStoresArgs,
  {
    dispatch: AppDispatch;
    state: RootState;
    rejectValue: CloneStoresError;
  }
>(
  "concepts/cloneStores",
  async (data: CloneStoresArgs, { rejectWithValue, dispatch, getState }) => {
    try {
    } catch (err) {
      return rejectWithValue({ message: "Error cloning stores" });
    }
  }
);

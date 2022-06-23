import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../../../app/store";

type CloneStoresError = { message: string };
type CloneStoresArgs = { conceptId: string };

export const cloneStores = createAsyncThunk<
  unknown,
  CloneStoresArgs,
  {
    dispatch: AppDispatch;
    state: RootState;
    rejectValue: CloneStoresError;
  }
>(
  "concepts/cloneStores",
  async (data, { rejectWithValue, dispatch, getState }) => {
    try {
      console.log(data);
    } catch (err) {
      return rejectWithValue({ message: "Error cloning stores" });
    }
  }
);

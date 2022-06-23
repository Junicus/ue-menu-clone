import { createAsyncThunk } from "@reduxjs/toolkit";
import moment from "moment";
import { UEToken } from "../settingsSlice";
import { getToken } from "../../../app/ueApi";

type UberEatsAuthError = { message: string };
type RenewTokenArgs = { client_id: string; client_secret: string };

export const renewToken = createAsyncThunk<
  UEToken,
  RenewTokenArgs,
  { rejectValue: UberEatsAuthError }
>("settings/renewToken", async (credentials, { rejectWithValue }) => {
  const { client_id, client_secret } = credentials;
  try {
    const response = await getToken(client_id, client_secret);
    const expires_at = moment()
      .add(response.expires_in, "seconds")
      .subtract(1, "day")
      .unix();
    return { ...response, expires_at };
  } catch (err) {
    return rejectWithValue({ message: "Error renewing token" });
  }
});

import { createAsyncThunk } from "@reduxjs/toolkit";
import { http } from "@tauri-apps/api";
import moment from "moment";
import { UEToken } from "../settingsSlice";

type UberEatsAuthResponse = Omit<UEToken, "expires_at">;
type UberEatsAuthError = { message: string };
type RenewTokenArgs = { client_id: string; client_secret: string };

export const renewToken = createAsyncThunk<
  UEToken,
  RenewTokenArgs,
  { rejectValue: UberEatsAuthError }
>("settings/renewToken", async (credentials: RenewTokenArgs, thunkApi) => {
  const { client_id, client_secret } = credentials;
  try {
    const response = await http.fetch<UberEatsAuthResponse>(
      "https://login.uber.com/oauth/v2/token",
      {
        method: "POST",
        body: http.Body.form({
          client_id,
          client_secret,
          scope: "eats.store",
          grant_type: "client_credentials",
        }),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const expires_at = moment()
      .add(response.data.expires_in, "seconds")
      .subtract(1, "day")
      .unix();

    return { ...response.data, expires_at };
  } catch (err) {
    return thunkApi.rejectWithValue({ message: "Error renewing token" });
  }
});

// export const renewToken = createAsyncThunk<
//   UEToken,
//   RenewTokenArgs,
//   { rejectValue: UberEatsAuthError }
// >("settings/renewToken", async (credentials, thunkApi) => {
//   const { client_id, client_secret } = credentials;
//   try {
//     const response = await http.fetch<UberEatsAuthResponse>(
//       "https://login.uber.com/oauth/v2/token",
//       {
//         method: "POST",
//         body: http.Body.form({
//           client_id,
//           client_secret,
//           scope: "eats.store",
//           grant_type: "client_credentials",
//         }),
//         headers: {
//           "Content-Type": "application/x-www-form-urlencoded",
//         },
//       }
//     );

//     const expires_at = moment()
//       .add(response.data.expires_in, "seconds")
//       .subtract(1, "day")
//       .unix();

//     return { ...response.data, expires_at };
//   } catch (err) {
//     return thunkApi.rejectWithValue({ message: "Error renewing token" });
//   }
// });

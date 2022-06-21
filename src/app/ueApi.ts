import { http } from "@tauri-apps/api";

export interface UEToken {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
}

export async function getToken(
  client_id: string,
  client_secret: string
): Promise<UEToken> {
  const result = await http.fetch<UEToken>(
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
  return result.data;
}

import { http } from "@tauri-apps/api";
import { gzip } from "pako";

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

export async function getMenu(
  uberId: string,
  token: UEToken | undefined
): Promise<any> {
  if (token) {
    const result = await http.fetch<any>(
      `https://api.uber.com/v2/eats/stores/${uberId}/menus`,
      {
        method: "GET",
        headers: {
          authorization: `${token.token_type} ${token.access_token}`,
        },
      }
    );
    return result.data;
  }
}

export async function uploadMenu(
  uberId: string,
  body: any,
  token: UEToken | undefined
): Promise<any> {
  console.log(uberId, body);

  // if (token) {
  //   const result = await http.fetch<any>(
  //     `https://api.uber.com/v2/eats/stores/${uberId}/menus`,
  //     {
  //       method: "PUT",
  //       body: http.Body.json(body),
  //       headers: {
  //         authorization: `${token.token_type} ${token.access_token}`,
  //       },
  //     }
  //   );
  //   return result.data;
  // }

  // if (token) {
  //   const result = await http.fetch<any>(
  //     `https://api.uber.com/v2/eats/stores/${uberId}/menus`,
  //     {
  //       method: "PUT",
  //       body: http.Body.bytes(gzip(JSON.stringify(body))),
  //       headers: {
  //         authorization: `${token.token_type} ${token.access_token}`,
  //         "Content-Type": "application/json",
  //         "Content-Encoding": "gzip",
  //       },
  //     }
  //   );
  //   return result.data;
  // }
}

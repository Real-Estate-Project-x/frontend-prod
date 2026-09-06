import axios, { AxiosError } from "axios";
import type { LoginForm } from "$lib/types";
import { encryptData, decryptData } from "$lib/utils";
import { error, json, type RequestHandler } from "@sveltejs/kit";
import { THIRTY_DAYS, TWENTY_FOUR_HOURS } from "$lib/utils/constant";
import { PUBLIC_API_BASE_URL, PUBLIC_ENCRYPTION_KEY } from "$env/static/public";

export const POST: RequestHandler = async ({ request, cookies, fetch }) => {
  const body: LoginForm = await request.json();
  const encryptedPassword = encryptData(body.password, PUBLIC_ENCRYPTION_KEY);

  try {
    const url = `${PUBLIC_API_BASE_URL}/auth/login`;
    const payload = {
      ...body,
      password: encryptedPassword,
    };
    const response = await axios.post(url, payload, {
      headers: { "Content-Type": "application/json" },
    });

    if (response.status !== 201) {
      return json(response.data, { status: response.status });
    }

    const result = response.data;
    const decryptedInfo = decryptData(result.data, PUBLIC_ENCRYPTION_KEY);

    if (decryptedInfo) {
      const config: any = {
        path: "/",
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        maxAge: THIRTY_DAYS,
      };
      cookies.set("blp_data", result, config);

      const userInfo = JSON.parse(decryptedInfo);

      // set cookies that can be used to set locals constants across the app
      cookies.set("user_id", userInfo.userId, config);
      cookies.set("access_token", userInfo.jwtToken, config);
      // Explicitly persist agencyId
      if (userInfo.agencyId) {
        cookies.set("agency_id", userInfo.agencyId, config);
      }
    }

    return json({ enc: result.data });
  } catch (ex) {
    if (ex instanceof AxiosError) {
      throw error(
        ex.response?.status ?? 500,
        ex.response?.data ?? { message: ex.message }
      );
    }
    throw ex;
  }
};

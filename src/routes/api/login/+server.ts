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
    const decryptedInfo = JSON.parse(
      decryptData(result.data, PUBLIC_ENCRYPTION_KEY)
    );

    cookies.set("blp_data", result, {
      path: "/",
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: THIRTY_DAYS,
    });

    if (decryptedInfo) {
      cookies.set("access_token", decryptedInfo.jwtToken, {
        path: "/",
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        maxAge: body.rememberMe ? THIRTY_DAYS : TWENTY_FOUR_HOURS,
      });
    }
    return json({ decryptedInfo, enc: result.data });
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

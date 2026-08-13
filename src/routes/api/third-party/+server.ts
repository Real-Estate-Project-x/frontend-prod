import { decryptData } from "$lib/utils";
import axios, { AxiosError } from "axios";
import { TWENTY_FOUR_HOURS } from "$lib/utils/constant";
import type { ThirdPartyAuthDTO } from "$lib/api/type.dto";
import { error, json, type RequestHandler } from "@sveltejs/kit";
import { PUBLIC_API_BASE_URL, PUBLIC_ENCRYPTION_KEY } from "$env/static/public";

export const POST: RequestHandler = async ({ request, cookies, fetch }) => {
  const body: ThirdPartyAuthDTO = await request.json();

  try {
    const url = `${PUBLIC_API_BASE_URL}/auth/login/third-party`;
    const response = await axios.post(url, body, {
      headers: { "Content-Type": "application/json" },
    });

    if (response.status !== 201) {
      return json(response.data, { status: response.status });
    }

    const result = response.data;
    const decryptedInfo = decryptData(result.data, PUBLIC_ENCRYPTION_KEY);

    const cookieConfig: any = {
      path: "/",
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: TWENTY_FOUR_HOURS,
    };

    cookies.set("blp_data", result, cookieConfig);

    const decryptedInfoJson = JSON.parse(decryptedInfo);
    if (decryptedInfoJson) {
      cookies.set("user_id", decryptedInfoJson.userId, cookieConfig);
      cookies.set("access_token", decryptedInfoJson.jwtToken, cookieConfig);
    }
    return json({
      enc: result.data,
      decryptedInfo: decryptedInfoJson,
    });
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

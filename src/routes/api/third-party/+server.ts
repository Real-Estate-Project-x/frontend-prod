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

    const cookieConfig: any = {
      path: "/",
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: TWENTY_FOUR_HOURS,
    };

    cookies.set("blp_data", result, cookieConfig);

    const userInfo = JSON.parse(
      decryptData(result.data, PUBLIC_ENCRYPTION_KEY)
    );

    // set cookies that can be used to set locals constants across the app
    cookies.set("user_id", userInfo.userId, cookieConfig);
    cookies.set("access_token", userInfo.jwtToken, cookieConfig);
    // Explicitly persist agencyId
    if (userInfo.agencyId) {
      cookies.set("agency_id", userInfo.agencyId, cookieConfig);
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

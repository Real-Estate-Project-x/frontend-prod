import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { ApiRequests } from "$lib/api/api.request";

export const load: PageServerLoad = async ({ locals }) => {
  const req = new ApiRequests(locals.clientIp);
  try {
    const [countries, ipCountry] = await Promise.all([
      req.listCountries({
        isSignupEnabled: true,
      }),
      req.findCountryByIP(),
    ]);

    return {
      countries: countries.data,
      ipCountry: ipCountry.data,
    };
  } catch (ex: any) {
    console.error("LOAD FAILED", ex.response?.status, ex.response?.data);
    throw error(
      ex.response?.status ?? 500,
      ex.response?.data?.message ?? "Failed to load"
    );
  }
};

import type { PageLoad } from "./$types";
import { ApiRequests } from "$lib/api/api.request";

export const load: PageLoad = async ({ params }) => {
  const req = new ApiRequests();
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
};

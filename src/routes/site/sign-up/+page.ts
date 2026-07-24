import axios from "axios";
import type { PageLoad } from "./$types";
import { ApiRequests } from "$lib/api/api.request";
import { PUBLIC_API_BASE_URL } from "$env/static/public";

export const load: PageLoad = async ({ params }) => {
  try {
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
  } catch (ex: any) {
    console.error("LOAD FAILED");
    console.error(ex);
    console.error(ex.response?.data);
    console.error(ex.response?.status);

    throw ex;
  }
};

// const findCountryByIP = async () => {
//   const url = `${PUBLIC_API_BASE_URL}/data/countries/ip`;
//   return axios.get(url);
// };

// const listCountries = async () => {
//   const url = `${PUBLIC_API_BASE_URL}/data/countries`;
//   return axios.get(url, {
//     params: { isSignupEnabled: true },
//   });
// };

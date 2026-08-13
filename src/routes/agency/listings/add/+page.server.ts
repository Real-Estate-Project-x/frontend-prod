import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { ApiRequests } from "$lib/api/api.request";

export const load: PageServerLoad = async ({ locals, cookies }) => {
  const ip = locals.clientIp;
  const req = new ApiRequests(ip);
  const userId = String(cookies.get("user_id"));

  try {
    let states, agency, amenities;
    const country = await req.findCountryByIp();
    if (country.data.success) {
      const countryId = country.data.data.id;
      const region = country.data.data.bpRegion;

      const [stateRecords, listingAmenities, agencyRecord] = await Promise.all([
        req.findStates({ countryId }),
        req.findListingAmenities({ regionScope: region }),
        req.findCreatedAgency(userId),
      ]);

      states = stateRecords.data;
      agency = agencyRecord.data;
      amenities = listingAmenities.data;
    }

    return {
      agency,
      states,
      amenities,
      countryIp: country.data,
    };
  } catch (ex: any) {
    console.error("LOAD FAILED", ex.response?.status, ex.response?.data);
    throw error(
      ex.response?.status ?? 500,
      ex.response?.data?.message ?? "Failed to load"
    );
  }
};

import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { ListingFor } from "$lib/utils/constant";
import { ApiRequests } from "$lib/api/api.request";

export const load: PageServerLoad = async ({ locals, cookies }) => {
  const ip = locals.clientIp;
  const req = new ApiRequests(ip);
  const userId = String(cookies.get("user_id"));

  try {
    let states, agency, amenities, listingTypes, currencies;
    const country = await req.findCountryByIp();
    if (country.data.success) {
      const countryId = country.data.data.id;
      const region = country.data.data.bpRegion;

      const [
        stateRecords,
        listingAmenities,
        agencyRecord,
        listingTypeRecords,
        currencyRecords,
      ] = await Promise.all([
        req.findStates({ countryId }),
        req.findListingAmenities({ regionScope: region }),
        req.findCreatedAgency(userId),
        req.findListingTypes({
          regionScope: region,
          listingFor: ListingFor.RENT,
        }),
        req.findCountries({
          isFxConversionEnabled: true,
          fields: "success,data(id,name,flag,currency,currencySymbol)",
        }),
      ]);

      currencies = currencyRecords.data;
      states = stateRecords.data;
      agency = agencyRecord.data;
      amenities = listingAmenities.data;
      listingTypes = listingTypeRecords.data;
    }

    return {
      agency,
      states,
      amenities,
      currencies,
      listingTypes,
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

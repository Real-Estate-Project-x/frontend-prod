import { isEmpty } from "lodash-es";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { RegionScope } from "$lib/utils/constant";
import { ApiRequests } from "$lib/api/api.request";

export const load: PageServerLoad = async ({ locals }) => {
  const { clientIp: ip, agencyId } = locals;
  const req = new ApiRequests(ip);

  try {
    let kpis, listings, listingTypes;
    const country = await req.findCountryByIp();

    if (!isEmpty(country)) {
      const region = country.data.data.bpRegion ?? RegionScope.WEST_AFRICA;
      const [kpi, listingType, listing] = await Promise.all([
        req.findAgencyListingsKPICards(agencyId),
        req.findListingTypes({ regionScope: region }),
        req.findAgencyListings(agencyId, {
          pageSize: 12,
          pageNumber: 1,
        }),
      ]);

      kpis = kpi.data;
      listings = listing.data;
      listingTypes = listingType.data;
    }

    return {
      kpis,
      listings,
      listingTypes,
      country: country.data,
    };
  } catch (ex: any) {
    console.error("LOAD FAILED", ex.response?.status, ex.response?.data);
    throw error(
      ex.response?.status ?? 500,
      ex.response?.data?.message ?? "Failed to load"
    );
  }
};

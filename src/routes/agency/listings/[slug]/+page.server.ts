import { isEmpty } from "lodash-es";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { ApiRequests } from "$lib/api/api.request";

export const load: PageServerLoad = async ({ locals, params }) => {
  const slug = params.slug;
  const { clientIp: ip, agencyId } = locals;

  const req = new ApiRequests(ip);
  let listing;

  try {
    const [listingData] = await Promise.all([
      req.findAgencyListingBySlug(agencyId, slug),
    ]);

    if (listingData.data) {
      listing = listingData.data.data;
    }

    return { listing };
  } catch (ex: any) {
    console.error("LOAD FAILED", ex.response?.status, ex.response?.data);
    throw error(
      ex.response?.status ?? 500,
      ex.response?.data?.message ?? "Failed to load"
    );
  }
};

import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { ApiRequests } from "$lib/api/api.request";

export const load: PageServerLoad = async ({ locals, params }) => {
  try {
    const result = await new ApiRequests(locals.clientIp).findUserBySlug(
      params.account_ref
    );

    return { userProfile: result.data };
  } catch (ex: any) {
    console.error("LOAD FAILED", ex.response?.status, ex.response?.data);
    throw error(
      ex.response?.status ?? 500,
      ex.response?.data?.message ?? "Failed to load"
    );
  }
};

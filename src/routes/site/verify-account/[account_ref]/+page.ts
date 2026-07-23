import { ApiRequests } from "$lib/api/api.request";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ params }) => {
  const result = await new ApiRequests().findUserBySlug(params.account_ref);

  return {
    userProfile: result.data,
  };
};

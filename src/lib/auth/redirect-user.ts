import { AppRole } from "$lib/utils/constant";
import { PUBLIC_SITE_BASE_URL } from "$env/static/public";

export function redirectUser(role: string, redirectUrl?: string): string {
  let baseUrl: string;

  switch (role) {
    case AppRole.ADMIN:
    case AppRole.LANDLORD:
    case AppRole.SUPER_ADMIN:
      baseUrl = "/admin/dashboard";
      break;
    case AppRole.AGENT:
      baseUrl = "/agency";
      break;
    case AppRole.CUSTOMER:
      baseUrl = "/users";
      break;
    case AppRole.SUB_AGENT:
      baseUrl = "/s-agents";
      break;
    default:
      baseUrl = "/";
  }

  if (!redirectUrl) return baseUrl;

  const sanitizedRedirect = redirectUrl.split("?")[0].replace(/\/+$/, "");
  if (sanitizedRedirect === baseUrl) return redirectUrl;
  if (sanitizedRedirect.startsWith(`${baseUrl}/`)) {
    return new URL(redirectUrl, PUBLIC_SITE_BASE_URL).pathname;
  }
  return baseUrl;
}

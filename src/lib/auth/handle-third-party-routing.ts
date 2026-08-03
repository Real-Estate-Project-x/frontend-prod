import { goto } from "$app/navigation";
import axios, { AxiosError } from "axios";
import { ApiRequests } from "$lib/api/api.request";
import { PUBLIC_SITE_BASE_URL } from "$env/static/public";
import { getErrorMessage, setLocalStorageField } from "$lib/utils";
import { AppRole, LSKey, type AuthProvider } from "$lib/utils/constant";

type ThirdPartySession = {
  user: { id: string; name: string; email: string; phoneNumber?: string };
};

export async function handleThirdPartyRouting(opts: {
  role: AppRole;
  provider: AuthProvider;
  session: ThirdPartySession;
  redirectTo?: string | null;
}) {
  const { role, provider, session, redirectTo } = opts;

  try {
    if (role === AppRole.AGENT) {
      // Agents always go through the signup-check gate — new agents
      // need to complete a profile (RC Number etc.) before they're live.
      const result = await new ApiRequests().thirdPartySignupCheck({
        provider,
        externalUserId: session.user.email,
        // externalUserId: session.user.id,
      });

      if (result.data) {
        switch (result.data.message) {
          case "new_user":
            goto(
              `/site/sign-up-completion/?status=complete_profile&provider=${provider}`
            );
            break;
          case "user_exists_login_instead":
            await loginAndRedirect(role, provider, session, redirectTo);
            break;
          default:
            throw new Error("could not verify intent");
        }
      }
      return;
    }

    // Customers: backend upserts on /api/third-party, no separate
    // signup-check needed since there's no extra profile step required.
    await loginAndRedirect(role, provider, session, redirectTo);
  } catch (ex) {
    if (ex instanceof AxiosError) {
      const message = getErrorMessage(ex);
      goto(`/site/sign-up/?err=${message}`);
    }
  }
}

async function loginAndRedirect(
  role: AppRole,
  provider: AuthProvider,
  session: ThirdPartySession,
  redirectTo?: string | null
) {
  const user = session.user;
  const name = user.name.split(" ");

  const payload = {
    role,
    provider,
    email: user.email,
    // externalUserId: user.id,
    externalUserId: user.email,
    firstName: name[0],
    ...(name[1] && { lastName: name[1] }),
    ...(user.phoneNumber && { phoneNumber: user.phoneNumber }),
  };

  const response = await axios.post("/api/third-party", payload);
  const result = response.data;

  if (result?.enc) {
    setLocalStorageField(LSKey.blp_data, result.enc);
    const userInfo = result.decryptedInfo;
    if (userInfo) {
      goto(
        redirectTo
          ? redirectUser(userInfo.roleName, redirectTo)
          : redirectUser(userInfo.roleName)
      );
    }
  }
}

function redirectUser(role: string, redirectUrl?: string): string {
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

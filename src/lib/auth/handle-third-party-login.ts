import { goto } from "$app/navigation";
import axios, { AxiosError } from "axios";
import { redirectUser } from "./redirect-user";
import { ApiRequests } from "$lib/api/api.request";
import { LSKey, type AuthProvider } from "$lib/utils/constant";
import { getErrorMessage, setLocalStorageField } from "$lib/utils";

type ThirdPartySession = {
  user: { id: string; name: string; email: string; phoneNumber?: string };
};

export async function handleThirdPartyLogin(opts: {
  provider: AuthProvider;
  session: ThirdPartySession;
  redirectTo?: string | null;
}) {
  const { provider, session, redirectTo } = opts;
  const externalUserId = session.user.id;

  try {
    // 1. Gate — do not touch the upsert endpoint until we know the account exists.
    const check = await new ApiRequests().thirdPartySignupCheck({
      provider,
      externalUserId,
    });

    // adjust `check.data` if your endpoint wraps the bool, e.g. `check.data.exists`
    if (!check.data || check.data.message === "new_user") {
      goto("/site/login/?err=no_account_found_sign_up_first");
      return;
    }

    // 2. Confirmed existing — safe to call the upsert endpoint now,
    //    since "upsert" against a known record is just an update, never a create.
    const user = session.user;
    const name = user.name.split(" ");

    const response = await axios.post("/api/third-party", {
      provider,
      externalUserId,
      email: user.email,
      firstName: name[0],
      ...(name[1] && { lastName: name[1] }),
      ...(user.phoneNumber && { phoneNumber: user.phoneNumber }),
    });

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
  } catch (ex) {
    if (ex instanceof AxiosError) {
      console.error(ex);
      goto(`/site/login/?err=${getErrorMessage(ex)}`);
      return;
    }
  }
}

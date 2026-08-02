<script lang="ts">
    import { onMount } from "svelte";
    import { page } from "$app/state";
    import { goto } from "$app/navigation";
    import { authClient } from "$lib/auth-client";
    import type { AuthProvider } from "$lib/utils/constant";
    import { handleThirdPartyLogin } from "$lib/auth/handle-third-party-login";

    onMount(async () => {
      const { data: session, error } = await authClient.getSession();

      const queryParams = page.url.searchParams;
      const redirectTo = queryParams.get("redirect_to");
      const provider = queryParams.get("provider") as AuthProvider;

      if (!provider || error || !session) {
        goto("/site/login/?err=login_unauthorized");
        return;
      }
  
      handleThirdPartyLogin({ provider, session, redirectTo });
    });
  </script>
import { createAuthClient } from "better-auth/svelte";
import { PUBLIC_SITE_BASE_URL } from "$env/static/public";

export const authClient = createAuthClient({
  // optional — defaults to the current origin
  baseURL: PUBLIC_SITE_BASE_URL,
});

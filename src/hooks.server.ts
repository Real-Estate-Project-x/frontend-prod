import { auth } from "$lib/server/auth";
import type { Handle } from "@sveltejs/kit";
import { sequence } from "@sveltejs/kit/hooks";
import { dev, building } from "$app/environment";
import { ipContext } from "$lib/server/request-context";
import { svelteKitHandler } from "better-auth/svelte-kit";

export const ipHook: Handle = async ({ event, resolve }) => {
  let clientIp = event.getClientAddress();
  if (dev && (clientIp === "::1" || clientIp === "127.0.0.1")) {
    clientIp = "102.90.82.74"; // dev placeholder
  }

  event.locals.clientIp = clientIp;
  console.log(
    "[hooks.server.ts] bound clientIp:",
    clientIp,
    "for",
    event.url.pathname
  );

  return ipContext.callAsync({ clientIp }, () => resolve(event));
};

export const thirdPartyAuthHook: Handle = async ({ event, resolve }) => {
  const session = await auth.api.getSession({ headers: event.request.headers });
  if (session) {
    event.locals.user = session.user;
    event.locals.session = session.session;
  }
  console.log(
    "[hooks.server.ts] authenticating user via third_party auth:",
    session,
    "for",
    event.url.pathname
  );

  return svelteKitHandler({ event, resolve, auth, building });
};

export const handle = sequence(ipHook, thirdPartyAuthHook);

import { dev } from "$app/environment";
import type { Handle } from "@sveltejs/kit";
import { ipContext } from "$lib/server/request-context";

export const handle: Handle = async ({ event, resolve }) => {
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

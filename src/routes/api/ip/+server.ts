import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = ({ locals }) => {
  return json({ ip: locals.clientIp });
};

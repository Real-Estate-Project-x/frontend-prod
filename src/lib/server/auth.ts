import { betterAuth } from "better-auth";
import {
  PUBLIC_GOOGLE_CLIENT_SECRET,
  PUBLIC_GOOGLE_CLIENT_ID,
  PUBLIC_APPLE_CLIENT_ID,
  PUBLIC_APPLE_CLIENT_SECRET,
} from "$env/static/public";

export const auth = betterAuth({
  socialProviders: {
    google: {
      clientId: PUBLIC_GOOGLE_CLIENT_ID!,
      clientSecret: PUBLIC_GOOGLE_CLIENT_SECRET!,
    },
    apple: {
      clientId: PUBLIC_APPLE_CLIENT_ID!,
      clientSecret: PUBLIC_APPLE_CLIENT_SECRET!, // a JWT you generate from your Apple key
    },
  },
});

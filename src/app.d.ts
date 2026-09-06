// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare module "lodash-es";

declare global {
  namespace App {
    interface Locals {
      user: any;
      clientIp: string;
      session: any;
      userId: string;
      agencyId: string;
      access_token: string;
    }
    // interface Error {}
    // interface Locals {}
    // interface PageData {}
    // interface PageState {}
    // interface Platform {}
  }
}

export {};

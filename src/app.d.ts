// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare module "lodash-es";

declare global {
  namespace App {
    interface Locals {
      clientIp: string;
      session: any;
      user: any;
    }
    // interface Error {}
    // interface Locals {}
    // interface PageData {}
    // interface PageState {}
    // interface Platform {}
  }
}

export {};

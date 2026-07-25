import { createContext } from "unctx";

interface RequestContext {
  clientIp: string;
}

export const ipContext = createContext<RequestContext>();

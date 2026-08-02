import type { AppRole, AuthProvider } from "$lib/utils/constant";
import type { InternalAxiosRequestConfig } from "axios";

export interface ApiErrorResponse {
  url: string;
  code: number;
  time: string;
  name: string;
  message: string;
  success: boolean;
}

// Extend AxiosRequestConfig to track retry state
export interface RetryableRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

export interface CreateUserDTO {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
}

export interface ThirdPartyAuthDTO {
  externalUserId: string;
  provider: AuthProvider;
  firstName: string;
  lastName: string;
  email: string;
  role: AppRole;
  phoneNumber?: string;
}

export interface ThirdPartySignupCheckDTO {
  externalUserId: string;
  provider: AuthProvider;
}

export interface CreateAgencyDTO {
  logoId: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  agencyName: string;
  agencyBio: string;
  businessAddress: string;
  isRegistered: boolean;
  regNumber: string;
  focusAreas: string[];
}

export interface PaginationRequestDTO {
  pageSize?: number;
  pageNumber?: number;
}

export interface CountriesFilterDTO extends PaginationRequestDTO {
  isSignupEnabled?: boolean;
  searchTerm?: string;
}

import type { InternalAxiosRequestConfig } from "axios";
import type {
  AppRole,
  ListingFor,
  RegionScope,
  AuthProvider,
  ListingCategory,
  ListingPaymentDuration,
  ListingStatus,
} from "$lib/utils/constant";

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

export interface RangePartial {
  start: number;
  end: number;
}

export interface CreateUserDTO {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
}

export interface CompleteAgencyProfileDTO {
  logoId: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  agencyName: string;
  agencyBio: string;
  businessAddress: string;
  isRegistered: boolean;
  regNumber: string;
  focusAreas: string[];
  externalUserId: string;
  profileImageId: string;
  provider: AuthProvider;
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

export interface FindListingTypesDTO extends PaginationRequestDTO {
  searchTerm: string;
  regionScope: RegionScope;
  listingFor: ListingFor;
  propertyCategory: ListingCategory;
}

export interface FindCountriesDTO extends PaginationRequestDTO {
  fields: string;
  isSignupEnabled: boolean;
  isFxConversionEnabled?: boolean;
}

export interface FindStatesDTO extends PaginationRequestDTO {
  searchTerm: string;
  countryId: string;
}

export interface FindListingAmenitiesDTO extends PaginationRequestDTO {
  regionScope: RegionScope;
}

export interface ExtraFee {
  label: string;
  amount: number;
}

export interface GeoPoint {
  latitude: number;
  longitude: number;
}

export interface CreateListingDTO {
  regionScope: RegionScope;
  paymentPeriod: ListingPaymentDuration;
  title: string;
  description: string;
  listingFor: ListingFor;
  listingTypeId: string;
  agencyId: string;
  address: string;
  landmark: string;
  geoPoint: GeoPoint;
  stateName: string;
  cityName: string;
  countryName: string;
  hasVirtualTour: boolean;
  priceAmount: 0;
  extraFees: ExtraFee[];
  bedrooms: number;
  toilets: number;
  sizeSqm: number;
  requirements: string[];
  amenities: string[];
  broadbandMbps: number;
  isBrandNew: boolean;
  photoIds: string[];
  videoId: string;
  ownershipDocIds: string[];
  archPlanIds: string[];
}

export interface CreateIntlListingDTO
  extends Pick<
    CreateListingDTO,
    | "paymentPeriod"
    | "archPlanIds"
    | "videoId"
    | "amenities"
    | "sizeSqm"
    | "photoIds"
    | "title"
    | "description"
    | "extraFees"
    | "priceAmount"
    | "listingTypeId"
    | "geoPoint"
    | "cityName"
    | "stateName"
    | "countryName"
    | "agencyId"
    | "bedrooms"
    | "toilets"
    | "isBrandNew"
    | "regionScope"
    | "listingFor"
    | "hasVirtualTour"
    | "address"
  > {
  broadbandMbps: number;
}

export interface AgentListingFilterDTO extends PaginationRequestDTO {
  searchTerm: string;
  listingTypeId: string;
  stateId: string;
  countryId: string;
  listingStatus: ListingStatus;
  bedrooms: number;
  priceRange: RangePartial;
  floorSizeRange: RangePartial;
  paymentPeriod: ListingPaymentDuration;
  hasVirtualTour: boolean;
  isBrandNew: boolean;
}

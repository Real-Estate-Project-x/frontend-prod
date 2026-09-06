export const THIRTY_DAYS = 60 * 60 * 24 * 30;
export const TWENTY_FOUR_HOURS = 60 * 60 * 24;

export enum AppRole {
  SUPER_ADMIN = "super_admin",
  ADMIN = "admin",
  AGENT = "agent",
  SUB_AGENT = "sub_agent",
  CUSTOMER = "customer",
  LANDLORD = "landlord",
}

export enum ListingMediaType {
  VIDEO = "video",
  PHOTO = "photo",
  ARCH_PLANS = "arch_plans",
  OWNERSHIP_DOCS = "ownership_docs",
}

export enum AuthProvider {
  LOCAL = "LOCAL",
  APPLE = "APPLE",
  GOOGLE = "GOOGLE",
}

export enum ListingPaymentDuration {
  WEEKLY = "WEEKLY",
  MONTHLY = "MONTHLY",
  YEARLY = "YEARLY",
  BI_ANNUALLY = "BI_ANNUALLY",
}

export enum RegionScope {
  WEST_AFRICA = "WEST_AFRICA",
  AFRICA_OTHER = "AFRICA_OTHER",
  INTERNATIONAL = "INTERNATIONAL",
}

export enum PropertyCategory {
  RESIDENTIAL = "RESIDENTIAL",
  COMMERCIAL = "COMMERCIAL",
  LAND = "LAND",
}

export enum ListingFor {
  RENT = "RENT",
  SALE = "SALE",
}

export enum ListingCategory {
  LAND = "LAND",
  RESIDENTIAL = "RESIDENTIAL",
  COMMERCIAL = "COMMERCIAL",
}

export enum LSKey {
  blp_data = "blp_data",
}

export enum ERROR_CODES {
  TOKEN_HAS_EXPIRED = "forbidden_expired_token",
  REGION_NOT_SUPPORTED = "region_not_currently_supported",
  BLACK_LISTED_TOKEN = "blacklisted_token_user_already_logged_out",
}

export enum ListingResponseStatus {
  LIVE = "live",
  DRAFT = "draft",
  AWAITING_CONFIRMATION = "awaiting_confirmation",
}

export enum ListingStatus {
  DRAFT = "DRAFT",
  ARCHIVED = "ARCHIVED",
  REJECTED = "REJECTED",
  PUBLISHED = "PUBLISHED",
  SUSPENDED = "SUSPENDED",
  PENDING_REVIEW = "PENDING_REVIEW",
}

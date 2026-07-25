export enum AppRole {
  SUPER_ADMIN = "super_admin",
  ADMIN = "admin",
  AGENT = "agent",
  SUB_AGENT = "sub_agent",
  CUSTOMER = "customer",
  LANDLORD = "landlord",
}

export enum LSKey {
  blp_data = "blp_data",
}

export enum ERROR_CODES {
  TOKEN_HAS_EXPIRED = "forbidden_expired_token",
  REGION_NOT_SUPPORTED = "region_not_currently_supported",
  BLACK_LISTED_TOKEN = "blacklisted_token_user_already_logged_out",
}

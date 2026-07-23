export interface CreateUserDTO {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
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

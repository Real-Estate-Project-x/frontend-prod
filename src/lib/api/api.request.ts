import type { AxiosInstance } from "axios";
import { browser } from "$app/environment";
import { encryptData, getUserIp } from "$lib/utils";
import { createAxiosInstance } from "./axios-interceptor";
import { PUBLIC_API_BASE_URL, PUBLIC_ENCRYPTION_KEY } from "$env/static/public";
import type {
  CreateUserDTO,
  CreateAgencyDTO,
  CountriesFilterDTO,
  ThirdPartyAuthDTO,
  ThirdPartySignupCheckDTO,
  CompleteAgencyProfileDTO,
  FindListingTypesDTO,
  FindStatesDTO,
  FindListingAmenitiesDTO,
  CreateListingDTO,
  CreateIntlListingDTO,
  FindCountriesDTO,
} from "./type.dto";
import { ListingMediaType } from "$lib/utils/constant";

export class ApiRequests {
  private ip?: string;
  private BASE_URL: string;
  private axiosInstance: AxiosInstance;

  constructor(ip?: string) {
    this.BASE_URL = PUBLIC_API_BASE_URL;
    this.ip = ip; // present when called server-side (locals.clientIp), undefined in browser unless hydrated
    this.axiosInstance = createAxiosInstance();

    // Attach IP dynamically at request time — never baked in at construction
    this.axiosInstance.interceptors.request.use(async (config) => {
      if (!this.ip && browser) {
        try {
          this.ip = await getUserIp(); // cached after first resolution
        } catch {
          // fail silently — don't block the request if IP resolution fails
        }
      }

      if (this.ip) {
        config.headers["x-user-ip"] = this.ip;
      }

      return config;
    });
  }

  async findCreatedAgency(userId: string) {
    const url = `${this.BASE_URL}/agency/created/${userId}`;
    return this.axiosInstance.get(url);
  }

  async tncCheck(externalUserId: string) {
    const url = `${this.BASE_URL}/user/sign-up/accept-tnc/check/${externalUserId}`;
    return this.axiosInstance.get(url);
  }

  async login(email: string, password: string, rememberMe = false) {
    const encryptedPassword = encryptData(password, PUBLIC_ENCRYPTION_KEY);

    const url = `${this.BASE_URL}/auth/login`;
    return this.axiosInstance.post(url, {
      email,
      password: encryptedPassword,
      rememberMe,
    });
  }

  async loginViaRef(accountRef: string) {
    const url = `${this.BASE_URL}/auth/login/${accountRef}`;
    return this.axiosInstance.post(url, {});
  }

  async thirdPartyLogin(payload: ThirdPartyAuthDTO) {
    const url = `${this.BASE_URL}/auth/login/third-party`;
    return this.axiosInstance.post(url, payload);
  }

  async thirdPartySignupCheck(payload: ThirdPartySignupCheckDTO) {
    const url = `${this.BASE_URL}/auth/third-party/check`;
    return this.axiosInstance.post(url, payload);
  }

  async forgotPassword(email: string) {
    const url = `${this.BASE_URL}/user/forgot-password`;
    return this.axiosInstance.post(url, { email });
  }

  async verifyUser(email: string, otp: string) {
    const url = `${this.BASE_URL}/user/forgot-password/verify`;
    return this.axiosInstance.post(url, { email, otp });
  }

  async changePassword(email: string, password: string) {
    const url = `${this.BASE_URL}/user/forgot-password/change-password`;

    const encryptedPassword = encryptData(password, PUBLIC_ENCRYPTION_KEY);
    return this.axiosInstance.post(url, {
      email,
      password: encryptedPassword,
    });
  }

  async userSignup(payload: CreateUserDTO) {
    const url = `${this.BASE_URL}/user/sign-up`;
    const encryptedPassword = encryptData(
      payload.password,
      PUBLIC_ENCRYPTION_KEY
    );
    return this.axiosInstance.post(url, {
      ...payload,
      password: encryptedPassword,
      confirmPassword: encryptedPassword,
    });
  }

  async agencyThirdPartySignupCompletion(payload: CompleteAgencyProfileDTO) {
    const url = `${this.BASE_URL}/agency/sign-up/third-party`;
    const encryptedPassword = encryptData(
      payload.password,
      PUBLIC_ENCRYPTION_KEY
    );

    return this.axiosInstance.post(url, {
      ...payload,
      password: encryptedPassword,
    });
  }

  async verifyAccount(email: string, otp: string) {
    const url = `${this.BASE_URL}/user/sign-up/verify`;
    return this.axiosInstance.post(url, { email, otp });
  }
  async resendAccountVerificationCode(userId: string) {
    const url = `${this.BASE_URL}/user/verify-account/resend-otp/${userId}`;
    return this.axiosInstance.post(url, {});
  }

  async uploadFiles(files: File[]) {
    const url = `${this.BASE_URL}/upload-files`;
    const payload = new FormData();
    files.forEach((file) => {
      payload.append("files[]", file);
    });

    return this.axiosInstance.post(url, payload, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }

  async uploadAvatar(avatarUrl: string) {
    const url = `${this.BASE_URL}/upload-files/avatar`;
    return this.axiosInstance.post(url, { url: avatarUrl });
  }

  async agencySignup(payload: CreateAgencyDTO) {
    const url = `${this.BASE_URL}/agency/sign-up`;
    const encryptedPassword = encryptData(
      payload.password,
      PUBLIC_ENCRYPTION_KEY
    );

    return this.axiosInstance.post(url, {
      ...payload,
      password: encryptedPassword,
      confirmPassword: encryptedPassword,
    });
  }

  async findUserById(userId: string) {
    const url = `${this.BASE_URL}/user/${userId}`;
    return this.axiosInstance.get(url);
  }

  async findUserBySlug(slug: string) {
    const url = `${this.BASE_URL}/user/by-slug/${slug}`;
    return this.axiosInstance.get(url);
  }

  async listCountries(payload: CountriesFilterDTO) {
    const url = `${this.BASE_URL}/data/countries`;
    return this.axiosInstance.get(url, {
      params: payload,
    });
  }

  async findCountryByIP() {
    const url = `${this.BASE_URL}/data/countries/ip`;
    return this.axiosInstance.get(url);
  }

  async verifyEmailAvailability(email: string) {
    const url = `${this.BASE_URL}/user/verify/email/${email}`;
    return this.axiosInstance.get(url);
  }

  async verifyPhoneNumberAvailability(phoneNumber: string) {
    const url = `${this.BASE_URL}/user/verify/phone/${phoneNumber}`;
    return this.axiosInstance.get(url);
  }

  async findListingTypes(payload: Partial<FindListingTypesDTO>) {
    const url = `${this.BASE_URL}/listing/types`;
    return this.axiosInstance.get(url, {
      params: payload,
    });
  }

  async findCountries(payload: Partial<FindCountriesDTO>) {
    const url = `${this.BASE_URL}/data/countries`;
    return this.axiosInstance.get(url, {
      params: payload,
    });
  }

  async findStates(payload: Partial<FindStatesDTO>) {
    const url = `${this.BASE_URL}/data/states`;
    return this.axiosInstance.get(url, {
      params: payload,
    });
  }

  async findCountryByIp() {
    const url = `${this.BASE_URL}/data/countries/ip`;
    return this.axiosInstance.get(url);
  }

  async findListingAmenities(payload: Partial<FindListingAmenitiesDTO>) {
    const url = `${this.BASE_URL}/listings/listing-amenities`;
    return this.axiosInstance.get(url, {
      params: payload,
    });
  }

  async autocompleteAddress(address: string) {
    const url = `${this.BASE_URL}/map/address-autocomplete/${address}`;
    return this.axiosInstance.get(url);
  }

  async createListing(payload: CreateListingDTO) {
    const url = `${this.BASE_URL}/listings`;
    return this.axiosInstance.post(url, payload);
  }

  async createIntlListing(payload: CreateIntlListingDTO) {
    const url = `${this.BASE_URL}/listings/intl`;
    return this.axiosInstance.post(url, payload);
  }

  async publishListing(listingId: string) {
    const url = `${this.BASE_URL}/listings/manage/publish/${listingId}`;
    return this.axiosInstance.patch(url, {});
  }

  async uploadMedia(files: File[], type: ListingMediaType) {
    let url = this.BASE_URL;

    switch (type) {
      default:
      case ListingMediaType.PHOTO:
        url += "/listings/uploads/photos";
        break;
      case ListingMediaType.VIDEO:
        url += "/listings/uploads/videos";
        break;
      case ListingMediaType.ARCH_PLANS:
        url += "/listings/uploads/arch-plans";
        break;
      case ListingMediaType.OWNERSHIP_DOCS:
        url += "/listings/uploads/owner-docs";
        break;
    }

    const payload = new FormData();
    files.forEach((file) => {
      payload.append("files[]", file);
    });

    return this.axiosInstance.post(url, payload, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }
}

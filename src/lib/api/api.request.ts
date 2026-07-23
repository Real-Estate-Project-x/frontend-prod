import { encryptData } from "$lib/utils";
import { axiosInstance } from "./axios-interceptor";
import { PUBLIC_API_BASE_URL, PUBLIC_ENCRYPTION_KEY } from "$env/static/public";
import type {
  CountriesFilterDTO,
  CreateAgencyDTO,
  CreateUserDTO,
} from "./type.dto";

export class ApiRequests {
  private BASE_URL: string;

  constructor() {
    this.BASE_URL = PUBLIC_API_BASE_URL;
  }

  async login(email: string, password: string, rememberMe = false) {
    const encryptedPassword = encryptData(password, PUBLIC_ENCRYPTION_KEY);

    const url = `${this.BASE_URL}/auth/login`;
    return axiosInstance.post(url, {
      email,
      password: encryptedPassword,
      rememberMe,
    });
  }

  async loginViaRef(accountRef: string) {
    const url = `${this.BASE_URL}/auth/login/${accountRef}`;
    return axiosInstance.post(url, {});
  }

  async forgotPassword(email: string) {
    const url = `${this.BASE_URL}/user/forgot-password`;
    return axiosInstance.post(url, { email });
  }

  async verifyUser(email: string, otp: string) {
    const url = `${this.BASE_URL}/user/forgot-password/verify`;
    return axiosInstance.post(url, { email, otp });
  }

  async changePassword(email: string, password: string) {
    const url = `${this.BASE_URL}/user/forgot-password/change-password`;

    const encryptedPassword = encryptData(password, PUBLIC_ENCRYPTION_KEY);
    return axiosInstance.post(url, {
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
    return axiosInstance.post(url, {
      ...payload,
      password: encryptedPassword,
      confirmPassword: encryptedPassword,
    });
  }

  async verifyAccount(email: string, otp: string) {
    const url = `${this.BASE_URL}/user/sign-up/verify`;
    return axiosInstance.post(url, { email, otp });
  }
  async resendAccountVerificationCode(userId: string) {
    const url = `${this.BASE_URL}/user/verify-account/resend-otp/${userId}`;
    return axiosInstance.post(url, {});
  }

  async uploadFiles(files: File[]) {
    const url = `${this.BASE_URL}/upload-files`;
    const payload = new FormData();
    files.forEach((file) => {
      payload.append("files[]", file);
    });

    return axiosInstance.post(url, payload, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }

  async agencySignup(payload: CreateAgencyDTO) {
    const url = `${this.BASE_URL}/agency/sign-up`;
    const encryptedPassword = encryptData(
      payload.password,
      PUBLIC_ENCRYPTION_KEY
    );

    return axiosInstance.post(url, {
      ...payload,
      password: encryptedPassword,
      confirmPassword: encryptedPassword,
    });
  }

  async findUserById(userId: string) {
    const url = `${this.BASE_URL}/user/${userId}`;
    return axiosInstance.get(url);
  }

  async findUserBySlug(slug: string) {
    const url = `${this.BASE_URL}/user/by-slug/${slug}`;
    return axiosInstance.get(url);
  }

  async listCountries(payload: CountriesFilterDTO) {
    const url = `${this.BASE_URL}/data/countries`;
    return axiosInstance.get(url, {
      params: payload,
    });
  }

  async findCountryByIP() {
    const url = `${this.BASE_URL}/data/countries/ip`;
    return axiosInstance.get(url);
  }

  async verifyEmailAvailability(email: string) {
    const url = `${this.BASE_URL}/user/verify/email/${email}`;
    return axiosInstance.get(url);
  }

  async verifyPhoneNumberAvailability(phoneNumber: string) {
    const url = `${this.BASE_URL}/user/verify/phone/${phoneNumber}`;
    return axiosInstance.get(url);
  }
}

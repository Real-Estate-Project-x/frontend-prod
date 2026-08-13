import {
  type CountryCode,
  parsePhoneNumberFromString,
} from "libphonenumber-js";
import CryptoJS from "crypto-js";
import { AxiosError } from "axios";
import { LSKey } from "./constant";
import type { NormalizePhoneOptions } from "$lib/types";

export const encryptData = <T>(rawData: T, encryptionKey: string): string => {
  let data: any = rawData;
  if (typeof rawData !== "string") {
    data = JSON.stringify(rawData);
  }
  return CryptoJS.AES.encrypt(data, encryptionKey).toString();
};

export const decryptData = (
  encryptedData: string,
  encryptionKey: string
): string =>
  CryptoJS.AES.decrypt(encryptedData, encryptionKey).toString(
    CryptoJS.enc.Utf8
  );

export const capitalize = (text: string) => {
  if (!text) return;

  return text
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const ipCache = {
  value: null as string | null,
  promise: null as Promise<string> | null, // ← prevents parallel calls during first fetch
};

export async function getUserIp(): Promise<string> {
  if (ipCache.value) return ipCache.value;

  if (!ipCache.promise) {
    ipCache.promise = fetch("/api/ip")
      .then((res) => {
        if (!res.ok) throw new Error(`IP fetch failed: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        ipCache.value = data.ip;
        return data.ip;
      })
      .catch((err) => {
        ipCache.promise = null;
        throw err;
      });
  }

  return ipCache.promise;
}

export const extractLocalStorageInfo = (decryptionKey: string) => {
  const data = getLocalStorageField<string>(LSKey.blp_data);

  if (!data) return;

  const decryptedData = decryptData(data, decryptionKey);
  return decryptedData ? JSON.parse(decryptedData) : null;
};

export const setLocalStorageField = <T>(key: string, data: T) => {
  if (typeof window === "undefined") return null;

  localStorage.setItem(key, JSON.stringify(data));
};

export const getLocalStorageField = <T>(key: string): T | null => {
  if (typeof window === "undefined") return null;

  const item = localStorage.getItem(key);
  if (!item) return null;
  try {
    return JSON.parse(item) as T;
  } catch {
    return null;
  }
};

export const deleteLocalStorageField = (key: string) => {
  if (typeof window === "undefined") return null;

  localStorage.removeItem(key);
};

export const removeStoredKeys = () => {
  // Local_storage
  ["userInfo", "agentId", "token", "user_email", "last_tracked_url"].forEach(
    (key) => {
      deleteLocalStorageField(key);
    }
  );
};

export function onLogOff(saveCurrentRoute = false) {
  removeStoredKeys();

  if (saveCurrentRoute) {
    const currentUrl = window.location.href;
    setLocalStorageField("last_tracked_url", { currentUrl });
  }

  // Navigate to login_screen
  window.location.href = "/login";
}

export const onRegionNotSupported = () => {
  window.location.href = "/region-not-supported";
};

export const getErrorMessage = (error: AxiosError) => {
  const errorObject: any = error.response?.data;
  return errorObject ? (errorObject["messages"] as string[])[0] : error.message;
};

export const capitalizeSentences = (text: string): string => {
  return text.replace(
    /(^|[.!?]\s+)([a-z])/g,
    (match, prefix, letter) => prefix + letter.toUpperCase()
  );
};

export const isFormComplete = <T extends Record<string, any>>(
  form: T,
  requiredBooleanFields: (keyof T)[] = []
): boolean => {
  return Object.entries(form).every(([key, value]) => {
    const k = key as keyof T;

    // Must be true for required boolean fields (e.g. terms & conditions)
    if (requiredBooleanFields.includes(k)) {
      return value === true;
    }

    // Reject null/undefined
    if (value === null || value === undefined) return false;

    // Strings must not be empty
    if (typeof value === "string") {
      return value.trim() !== "";
    }

    // Everything else (numbers, booleans not required, etc.)
    return true;
  });
};

export const maskEmail = (email: string) => {
  const [username, domain] = email.split("@");

  if (!username || !domain) return email;

  const maskedUsername =
    username.length <= 1
      ? username
      : username[0] + "•".repeat(username.length - 1);

  return `${maskedUsername}@${domain}`;
};

export const normalizeAndValidatePhone = ({
  phone,
  countryCode,
}: NormalizePhoneOptions): string => {
  if (!phone) {
    throw new Error("Phone number is required");
  }

  const parsed = parsePhoneNumberFromString(
    phone,
    countryCode.toUpperCase() as CountryCode
  );

  if (!parsed || !parsed.isValid()) {
    throw new Error("Invalid phone number");
  }

  // Always store in E.164 format
  return parsed.format("E.164");
};

export const toFileArray = (fileList: FileList | null): File[] => {
  return fileList ? Array.from(fileList) : [];
};

export const generatePreviewUrls = (files: []) =>
  files.map((f) => ({ file: f, preview: URL.createObjectURL(f) }));

export const getAmenityNames = (
  selectedIds: string[],
  lookup: Map<string, any>
): string[] => {
  return selectedIds
    .map((id) => lookup.get(id)?.displayName)
    .filter((name): name is string => Boolean(name));
};

export const getListingType = (
  listingTypeId: string,
  lookup: Map<string, any>
) => lookup.get(listingTypeId);

export const currencyFormatter = (amount: number): string =>
  new Intl.NumberFormat("en-NG").format(amount);

export const cleanObject = (obj: Record<string, any>): Record<string, any> => {
  const cleaned: Record<string, any> = {};

  Object.entries(obj).forEach(([key, value]) => {
    // Remove empty string, undefined, or null
    if (value === "" || value === undefined || value === null) {
      return;
    }

    // Handle empty arrays
    if (Array.isArray(value) && value.length <= 0) {
      return;
    }

    // Handle nested objects
    if (typeof value === "object" && !Array.isArray(value)) {
      const nested = cleanObject(value);

      // Only keep object if it has valid keys
      if (Object.keys(nested).length > 0) {
        cleaned[key] = nested;
      }

      return;
    }

    cleaned[key] = value;
  });

  return cleaned;
};

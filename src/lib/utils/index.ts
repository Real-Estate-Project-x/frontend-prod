import axios from "axios";

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
  // Return cached value immediately
  if (ipCache.value) return ipCache.value;

  // If a fetch is already in-flight, reuse it instead of making a new call
  if (!ipCache.promise) {
    ipCache.promise = axios
      .get("https://api.ipify.org?format=json")
      .then(({ data }) => {
        ipCache.value = data.ip;
        return data.ip;
      })
      .catch((err) => {
        ipCache.promise = null; // reset so it can retry on failure
        throw err;
      });
  }

  return ipCache.promise;
}

export const setLocalStorageField = <T>(key: string, data: T) =>
  localStorage.setItem(key, JSON.stringify(data));

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

export const deleteLocalStorageField = (key: string) =>
  localStorage.removeItem(key);

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

export function onRegionNotSupported() {
  window.location.href = "/region-not-supported";
}

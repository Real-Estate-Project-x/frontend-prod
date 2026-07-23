export type ListingType = "rent" | "buy" | "virtual";

export interface Listing {
  id: string;
  price: string;
  priceLabel?: string; // e.g. "/ month"
  address: string;
  beds: number;
  baths: number;
  area: string; // e.g. "110 m²"
  type: ListingType;
  featured?: boolean; // shows "Featured" badge
  boosted?: boolean; // shows gold "Boosted" badge
  scene: 1 | 2 | 3; // which PropScene gradient
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  initials: string;
  avatarColor: string;
}

export type ToastType = "success" | "error" | "info";

export interface NormalizePhoneOptions {
  phone: string;
  countryCode: string; // ISO-2 e.g. "NG", "US"
}

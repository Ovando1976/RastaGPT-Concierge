export type Recipe = {
  id: string;
  name: string;
  cuisine: string;
  prep_minutes: number;
  price_usd: number;
  ingredients: string[];
  restaurant: string;
  actions: string[];
};

export type Beach = {
  id: string;
  island: string;
  name: string;
  water_temp_f: number;
  rip_risk: "Low" | "Moderate" | "High";
  surf_ft: number;
  amenities: string[];
  actions: string[];
};

export type EventItem = {
  id: string;
  title: string;
  type: "Festival" | "Concert" | "Regatta" | "Culinary";
  island: string;
  date: string; // ISO
  location: string;
  price_usd: number;
  actions: string[];
};
// apps/rasta-gpt-concierge/app/types.ts
import type { Timestamp } from "firebase/firestore";

/* Current card shapes used by UI */
export type Recipe = {
  id: string;
  name: string;
  cuisine: string;
  prep_minutes: number;
  price_usd: number;
  ingredients: string[];
  restaurant: string;
  actions: string[];
  imageUrl?: string;          // for Next/Image thumbnails
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
  imageUrl?: string;
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
  imageUrl?: string;
};

/* Rich Firestore recipe model */
export type Region =
  | "Anglophone" | "Hispanic" | "Francophone" | "Dutch";

export type Cuisine =
  | "USVI" | "Jamaican" | "Trinidadian" | "Trinidadian & Tobagonian"
  | "Puerto Rican" | "Dominican" | "Haitian" | "Cuban"
  | "Bahamian" | "Barbadian" | "Belizean" | "Aruban" | "Curaçaoan"
  | string; // fallback so we can add more without breaking types

export type Category =
  | "bread" | "stew" | "seafood" | "rice" | "dessert"
  | "beverage" | "snack" | "sauce" | "soup" | "salad"
  | string;

export type Ingredient = {
  qty: number | null;
  unit: "tsp" | "tbsp" | "cup" | "ml" | "g" | "kg" | "lb" | "oz" | "pinch" | null;
  item: string;
  note?: string;
};

export type Step = {
  n: number;
  text: string;
  timeISO?: string;
  tip?: string;
};

export type Nutrition = Partial<{
  calories: number;
  protein_g: number;
  carbs_g: number;
  fat_g: number;
  sodium_mg: number;
}>;

export type RecipeDoc = {
  // Identity
  id?: string;
  slug: string;                   // "johnny-cakes"
  name: string;                   // "Johnny Cakes"
  altNames?: string[];
  region: Region;
  country: string;                // "USVI" | "Jamaica" | ...
  island?: string;
  cuisine: Cuisine;

  // Classification & UX
  category: Category;
  tags: string[];

  // Yield & time (ISO 8601)
  servings: number;
  prepTimeISO: string;            // "PT15M"
  cookTimeISO: string;            // "PT25M"
  totalTimeISO: string;           // "PT40M"
  difficulty: "easy" | "medium" | "hard";

  // Ingredients & steps
  ingredients: Ingredient[];
  steps: Step[];

  // Nutrition (optional, per serving)
  nutrition?: Nutrition;

  // Media & sources
  imageUrl?: string;
  credit?: { name: string; url?: string; license?: "CC0" | "CC-BY" | "Owned" | "Permission" };
  sourceUrls?: string[];

  // Commerce/UX hooks (optional)
  price_usd?: number;
  restaurant?: string;

  // Admin
  createdAt?: Timestamp | string;
  updatedAt?: Timestamp | string;
  approved?: boolean;
};
import { Recipe } from "../types";

export const RECIPES: Recipe[] = [
  {
    id: "callaloo",
    name: "Callaloo Soup",
    cuisine: "USVI",
    prep_minutes: 60,
    price_usd: 18,
    ingredients: ["callaloo greens","okra","saltfish","onion","thyme","garlic"],
    restaurant: "Rare Avatar / 3 Little Birds",
    actions: ["Book Tasting","Add to Cart"],
    imageUrl: "/images/recipes/callaloo.jpg"
  },
  {
    id: "conch_fritters",
    name: "Conch Fritters",
    cuisine: "USVI",
    prep_minutes: 35,
    price_usd: 16,
    ingredients: ["conch","flour","scotch bonnet","cilantro","egg"],
    restaurant: "Rare Avatar / 3 Little Birds",
    actions: ["Book Tasting","Add to Cart"],
    imageUrl: "/images/recipes/conch-fritters.jpg"
  },
  {
    id: "johnny_cakes",
    name: "Johnny Cakes",
    cuisine: "USVI",
    prep_minutes: 25,
    price_usd: 8,
    ingredients: ["flour","baking powder","sugar","salt","oil"],
    restaurant: "Rare Avatar / 3 Little Birds",
    actions: ["Book Tasting","Add to Cart"],
    imageUrl: "/images/recipes/johnny-cakes.jpg"
  }
];
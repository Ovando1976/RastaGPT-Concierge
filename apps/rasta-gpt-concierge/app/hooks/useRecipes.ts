"use client";

import type { Recipe } from "../types";
import { useEffect, useMemo, useState } from "react";
import { collection, getDocs, limit, orderBy, query, where } from "firebase/firestore";
import { getFirebaseDb } from "../lib/firebase";
import { toRecipeCard } from "../lib/mapRecipe";

/** Optional filters for Firestore query */
export type RecipeFilters = {
  cuisine?: string;         // e.g. "Jamaican", "USVI"
  category?: string;        // e.g. "bread","stew","seafood","rice","dessert","snack","main","soup"
  tags?: string[];          // at most 1 tag used for array-contains
};

export function useRecipes(max = 30, filters: RecipeFilters = {}) {
  const [items, setItems] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // A stable key so we re-fetch on filter change
  const key = useMemo(() => JSON.stringify({ max, filters }), [max, filters]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        setError(null);

        const db = getFirebaseDb();
        const base = collection(db, "recipes");
        const clauses: any[] = [where("approved", "==", true)];

        if (filters.cuisine) clauses.push(where("cuisine", "==", filters.cuisine));
        if (filters.category) clauses.push(where("category", "==", filters.category));
        if (filters.tags?.length) clauses.push(where("tags", "array-contains", filters.tags[0]));

        // order by name for stable UI; adjust as you like
        clauses.push(orderBy("name"));

        const snap = await getDocs(query(base, ...clauses, limit(max)));
        const list = snap.docs.map((d) => toRecipeCard(d.data() as any));
        if (!cancelled) setItems(list);
      } catch (e: any) {
        if (!cancelled) setError(e?.message || "fetch_error");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [key]);

  return { items, loading, error };
}
"use client";
import { useEffect, useState } from "react";
import { collection, getDocs, limit, query, where } from "firebase/firestore";
import { getFirebaseDb } from "../lib/firebase";
import { toRecipeCard } from "../lib/mapRecipe";
import type { Recipe } from "../types";

export function useRecipes(max = 30) {
  const [items, setItems] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const db = getFirebaseDb();
    const q = query(
      collection(db, "recipes"),
      where("approved", "==", true),
      limit(max)
    );
    getDocs(q)
      .then(snap => setItems(snap.docs.map(d => toRecipeCard(d.data() as any))))
      .catch(e => setError(e.message || "fetch_error"))
      .finally(() => setLoading(false));
  }, [max]);

  return { items, loading, error };
}
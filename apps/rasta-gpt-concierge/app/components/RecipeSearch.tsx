"use client";
import { useMemo, useState } from "react";
import { useRecipes } from "../hooks/useRecipes";
import type { RecipeFilters } from "../hooks/useRecipes";
import RecipeCard from "./RecipeCard";
import Carousel from "./Carousel";

const CUISINES = ["USVI","Jamaican","Trinidadian","Puerto Rican","Dominican","Cuban","Bahamian","Barbadian","Belizean","Curaçaoan"];
const CATEGORIES = ["bread","stew","seafood","rice","soup","snack","main","dessert"];

export default function RecipeSearch() {
  const [q, setQ] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [category, setCategory] = useState("");
  const [tag, setTag] = useState("");

  // ✅ Build filters by omitting empty fields
  const filters = useMemo<RecipeFilters>(() => {
    const f: RecipeFilters = {};
    if (cuisine) f.cuisine = cuisine;
    if (category) f.category = category;
    if (tag) f.tags = [tag];
    return f;
  }, [cuisine, category, tag]);

  const { items, loading, error } = useRecipes(60, filters);

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return items;
    return items.filter(r =>
      r.name.toLowerCase().includes(needle) ||
      r.ingredients.some(i => i.toLowerCase().includes(needle))
    );
  }, [items, q]);

  return (
    <section style={{marginTop:14}}>
      <div className="row" style={{marginBottom:10}}>
        <input
          className="input"
          placeholder="Search recipes (e.g., conch, soup, okra)…"
          value={q}
          onChange={e => setQ(e.target.value)}
          style={{flex:1}}
        />
        <button className="btn btn-outline" onClick={() => setQ("")}>Clear</button>
      </div>

      <div className="row">
        <select className="select" value={cuisine} onChange={e => setCuisine(e.target.value)}>
          <option value="">All cuisines</option>
          {CUISINES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <select className="select" value={category} onChange={e => setCategory(e.target.value)}>
          <option value="">All categories</option>
          {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <input
          className="input"
          placeholder="Tag (fried, coconut, street)"
          value={tag}
          onChange={e => setTag(e.target.value.trim())}
        />
      </div>

      {error && <div style={{color:"#ef4444", marginTop:8}}>Failed to load recipes: {error}</div>}
      {loading ? (
        <div style={{marginTop:10}}>Loading recipes…</div>
      ) : (
        <Carousel title="🍽️ Recipes">
          {filtered.map(r => <RecipeCard key={r.id} r={r} />)}
        </Carousel>
      )}
    </section>
  );
}
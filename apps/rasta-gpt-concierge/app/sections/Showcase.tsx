"use client";
import { useRecipes } from "../hooks/useRecipes";
import Carousel from "../components/Carousel";
import RecipeCard from "../components/RecipeCard";
import BeachCard from "../components/BeachCard";
import EventCard from "../components/EventCard";
import { RECIPES } from "../data/recipes";
import { BEACHES } from "../data/beaches";
import { EVENTS } from "../data/events";
import EventsFilter from "../components/EventsFilter";

export default function Showcase() {
const { items, loading, error } = useRecipes(30);
  if (error) return <div style={{color:"#ef4444"}}>Failed to load recipes: {error}</div>;
  if (loading) return <div>Loading recipes…</div>;


  return (
    <>
      <Carousel title="🍽️ Recipes & Catering">
        {RECIPES.map((r) => <RecipeCard key={r.id} r={r} />)}
      </Carousel>

      <Carousel title="🏖️ Beach Conditions">
        {BEACHES.map((b) => <BeachCard key={b.id} b={b} />)}
      </Carousel>

      <Carousel title="🎟️ Events & Activities">
        {EVENTS.map((e) => <EventCard key={e.id} e={e} />)}
      </Carousel>

     <EventsFilter />
    </>
  );
}
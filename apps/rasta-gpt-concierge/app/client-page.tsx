"use client";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import McpStatus from "./components/McpStatus";
import RateQuote from "./components/RateQuote";
import SectionTitle from "./components/SectionTitle";
import Hero from "./components/Hero";
import RecipeSearch from "./components/RecipeSearch";
import ShowcaseClient from "./components/ShowcaseClient"; // ← add this

export default function ClientPage() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Hero />

        <a id="rates" />
        <div className="panel" style={{ marginTop: 12 }}>
          <SectionTitle icon="🚕" title="Official Taxi Rate" />
          <RateQuote />
        </div>

        <div style={{ marginTop: 18 }}>
          <McpStatus />
        </div>

        <a id="recipes" />
        <SectionTitle icon="🍽️" title="Recipes & Catering" />
        <RecipeSearch />

        {/* Featured carousels (recipes/beaches/events demo) */}
        <ShowcaseClient/>

        <Footer />
      </div>
    </>
  );
}
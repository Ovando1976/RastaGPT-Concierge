"use client";

import AppProvider from "./providers.client";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import OneLoveAI from "./components/OneLoveAI";

const LAUNCH_CAPABILITIES = [
  {
    title: "Roots",
    description: "Explore Rastafari and Caribbean history with reviewed source retrieval, cultural context, and visible uncertainty.",
  },
  {
    title: "Creator",
    description: "Develop original concepts, writing, campaigns, lessons, stories, brands, and business-ready creative work.",
  },
  {
    title: "Business",
    description: "Turn ideas into practical offers, pricing, operations, marketing, sales plans, and next actions.",
  },
  {
    title: "Reasoning",
    description: "Work through complex decisions with stronger models, explicit assumptions, comparisons, and recommendations.",
  },
];

export default function ClientPage() {
  return (
    <AppProvider>
      <Navbar />
      <main className="container">
        <Hero />

        <div id="one-love-ai">
          <OneLoveAI />
        </div>

        <section id="launch-capabilities" aria-labelledby="launch-capabilities-title" style={{ margin: "34px 0" }}>
          <div className="section">
            <h3 id="launch-capabilities-title">Launch capabilities</h3>
            <div className="hr" />
          </div>
          <div className="row" style={{ alignItems: "stretch" }}>
            {LAUNCH_CAPABILITIES.map((capability) => (
              <article key={capability.title} className="card" style={{ flex: "1 1 220px", minWidth: 0 }}>
                <small>RastaGPT mode</small>
                <h4>{capability.title}</h4>
                <p className="p-muted" style={{ margin: 0, lineHeight: 1.55 }}>{capability.description}</p>
              </article>
            ))}
          </div>
        </section>

        <Footer />
      </main>
    </AppProvider>
  );
}

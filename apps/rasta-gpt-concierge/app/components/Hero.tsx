"use client";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-bg" />
      <div className="hero-inner">
        <div className="hero-badge">🌴 RastaGPT Concierge</div>
        <h1 className="hero-title">USVI at your fingertips</h1>
        <p className="hero-sub">
          Book tastings, check beach conditions, explore events — all inside a
          gorgeous ChatGPT-native UI.
        </p>
        <div className="hero-actions">
          <a href="#rates" className="btn">Get a Taxi Quote</a>
          <a href="#recipes" className="btn btn-outline">Browse Recipes</a>
        </div>
      </div>
    </section>
  );
}
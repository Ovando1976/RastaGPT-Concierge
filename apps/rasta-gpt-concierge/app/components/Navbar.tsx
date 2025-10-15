"use client";
import { useUser } from "./AuthProvider";

export default function Navbar() {
  const { user, login, logout } = useUser?.() ?? { user: null, login: () => {}, logout: () => {} };
  return (
    <header className="nav">
      <div className="nav-inner">
        <div className="brand">
          <span>🌴 RastaGPT</span><small className="kbd">Concierge</small>
        </div>
        <div className="spacer" />
        {user ? (
          <button className="btn btn-outline" onClick={logout}>Sign out</button>
        ) : (
          <button className="btn" onClick={login}>Sign in</button>
        )}
      </div>
    </header>
  );
}
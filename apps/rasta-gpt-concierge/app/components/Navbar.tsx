"use client";

import { useUser } from "./AuthProvider";

export default function Navbar() {
  const { user, login, logout } = useUser?.() ?? { user: null, login: () => {}, logout: () => {} };

  return (
    <header className="nav">
      <div className="nav-inner">
        <div className="brand" aria-label="RastaGPT">
          <span>RastaGPT</span><small className="kbd">One Love AI</small>
        </div>
        <div className="spacer" />
        {user ? (
          <button className="btn btn-outline" onClick={() => void logout()}>Sign out</button>
        ) : (
          <button className="btn" onClick={() => void login()}>Sign in</button>
        )}
      </div>
    </header>
  );
}

"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut, type Auth } from "firebase/auth";
import { getFirebaseAuth } from "../lib/firebase";

type UserContextType = {
  user: any;
  login: () => Promise<void>;
  logout: () => Promise<void>;
};

const UserCtx = createContext<UserContextType>({
  user: null,
  login: async () => {},
  logout: async () => {},
});

export const useUser = () => useContext(UserCtx);

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<any>(null);

  // ✅ Initialize auth lazily INSIDE the client component
  const auth: Auth = useMemo(() => getFirebaseAuth(), []);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, setUser);
    return () => unsub();
  }, [auth]);

  const login = async () => {
    await signInWithPopup(auth, new GoogleAuthProvider());
  };

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <UserCtx.Provider value={{ user, login, logout }}>
      {children}
    </UserCtx.Provider>
  );
}
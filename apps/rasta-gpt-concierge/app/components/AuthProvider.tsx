// app/components/AuthProvider.tsx  (CLIENT)
"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut, type Auth, type User } from "firebase/auth";
import { getFirebaseAuth } from "../lib/firebase.client";

type Ctx = { user: User | null; loading: boolean; login: () => Promise<void>; logout: () => Promise<void> };
const UserCtx = createContext<Ctx>({ user: null, loading: true, login: async () => {}, logout: async () => {} });
export const useUser = () => useContext(UserCtx);

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const auth: Auth = useMemo(() => getFirebaseAuth(), []);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, u => { setUser(u); setLoading(false); });
    return () => unsub();
  }, [auth]);

  const login = async () => { await signInWithPopup(auth, new GoogleAuthProvider()); };
  const logout = async () => { await signOut(auth); };

  return <UserCtx.Provider value={{ user, loading, login, logout }}>{children}</UserCtx.Provider>;
}
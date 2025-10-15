"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { getFirebaseAuth } from "../lib/firebase";
const auth = getFirebaseAuth();

type UserContextType = { user: any; login: () => void; logout: () => void; };
const UserCtx = createContext<UserContextType>({ user: null, login: () => {}, logout: () => {} });

export const useUser = () => useContext(UserCtx);

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  useEffect(() => onAuthStateChanged(auth, setUser), []);

  const login = async () => {
    await signInWithPopup(auth, new GoogleAuthProvider());
  };
  const logout = async () => { await signOut(auth); };

  return <UserCtx.Provider value={{ user, login, logout }}>{children}</UserCtx.Provider>;
}
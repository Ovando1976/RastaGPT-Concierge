"use client";

import dynamic from "next/dynamic";

// Load the client-only section with no SSR/hydration mismatch risk
const Showcase = dynamic(() => import("../sections/Showcase"), { ssr: false });

export default function ShowcaseClient() {
  return <Showcase />;
}
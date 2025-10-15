// SERVER file – do not add "use client"
import NextDynamic from "next/dynamic";

// Keep this only if you still need to bypass static prerender
export const dynamic = "force-dynamic";

export default function Page() {
  return <ClientPage />;
}
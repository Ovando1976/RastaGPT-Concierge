// apps/rasta-gpt-concierge/app/page.tsx  (SERVER)
import dynamic from "next/dynamic";

// Do NOT import firebase here.
// If you previously did, remove it.

// If you still get prerender hiccups while migrating, you can keep this:
export const dynamic = "force-dynamic"; // optional safety; remove later

// Load the client shell only in the browser
const ClientPage = dynamic(() => import("./client-page"), { ssr: false });

export default function Page() {
  return <ClientPage />;
}
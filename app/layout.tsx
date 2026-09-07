import type { Metadata } from "next";
import "../apps/rasta-gpt-concierge/app/globals.css";

export const metadata: Metadata = {
  title: {
    default: "RastaGPT · One Love AI",
    template: "%s · RastaGPT"
  },
  description: "Global intelligence with Caribbean consciousness. Ask, learn from the Roots, create original work, and build practical ideas with RastaGPT.",
  applicationName: "RastaGPT"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}

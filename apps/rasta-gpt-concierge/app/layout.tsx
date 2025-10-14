import * as React from "react";

export const metadata = { title: "RastaGPT Concierge", description: "USVI inside ChatGPT" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body style={{ fontFamily: "system-ui, -apple-system, Segoe UI, Roboto" }}>{children}</body>
    </html>
  );
}
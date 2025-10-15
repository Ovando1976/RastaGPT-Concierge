import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "RastaGPT Concierge",
  description: "USVI food, beaches, and events—right inside ChatGPT/Claude.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        {children} {/* ❌ no AppProvider/ClientProviders here */}
      </body>
    </html>
  );
}
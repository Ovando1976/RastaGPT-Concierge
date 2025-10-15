import "./globals.css";
import { Inter } from "next/font/google";
import AuthProvider from "./components/AuthProvider";


const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata = {
  title: "RastaGPT Concierge",
  description: "USVI food, beaches, and events—right inside ChatGPT/Claude.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body><AuthProvider>{children}</AuthProvider></body>
    </html>
  );
}
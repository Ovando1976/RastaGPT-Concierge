import Link from "next/link";

export default function NotFound() {
  return (
    <main style={{ padding: 32, maxWidth: 900, margin: "0 auto" }}>
      <h1 style={{ margin: 0 }}>404 | Not Found</h1>
      <p>Could not find the requested resource.</p>
      <p><Link href="/">Return home</Link></p>
    </main>
  );
}
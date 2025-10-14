export const runtime = "nodejs";
export async function GET() {
  return new Response(JSON.stringify({ ok: true, name: "rasta-gpt-concierge-web" }), {
    headers: { "content-type": "application/json" }
  });
}
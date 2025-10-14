import "dotenv/config";
import express, { Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import * as Sentry from "@sentry/node";
import { nodeProfilingIntegration } from "@sentry/profiling-node";

/* ────────────── Sample data ────────────── */
type Recipe = {
  id: string; name: string; cuisine: string; prep_minutes: number; price_usd: number;
  ingredients: string[]; restaurant: string; actions: string[];
};
type Beach = {
  id: string; island: string; name: string; water_temp_f: number; rip_risk: "Low" | "Moderate" | "High";
  surf_ft: number; amenities: string[]; actions: string[];
};
type EventItem = {
  id: string; title: string; type: "Festival" | "Concert" | "Regatta" | "Culinary";
  island: string; date: string; location: string; price_usd: number; actions: string[];
};

const RECIPES: Recipe[] = [
  { id:"callaloo", name:"Callaloo Soup", cuisine:"USVI", prep_minutes:60, price_usd:18,
    ingredients:["callaloo greens","okra","saltfish","onion","thyme","garlic"],
    restaurant:"Rare Avatar / 3 Little Birds", actions:["Book Tasting","Add to Cart"] },
  { id:"conch_fritters", name:"Conch Fritters", cuisine:"USVI", prep_minutes:35, price_usd:16,
    ingredients:["conch","flour","scotch bonnet","cilantro","egg"],
    restaurant:"Rare Avatar / 3 Little Birds", actions:["Book Tasting","Add to Cart"] },
  { id:"johnny_cakes", name:"Johnny Cakes", cuisine:"USVI", prep_minutes:25, price_usd:8,
    ingredients:["flour","baking powder","sugar","salt","oil"],
    restaurant:"Rare Avatar / 3 Little Birds", actions:["Book Tasting","Add to Cart"] },
  { id:"fungi", name:"Fungi (Cornmeal & Okra)", cuisine:"USVI", prep_minutes:40, price_usd:12,
    ingredients:["cornmeal","okra","butter","salt"],
    restaurant:"Rare Avatar / 3 Little Birds", actions:["Book Tasting","Add to Cart"] },
];

const BEACHES: Beach[] = [
  { id:"magens", island:"St. Thomas", name:"Magens Bay", water_temp_f:82, rip_risk:"Low",
    surf_ft:1.2, amenities:["Lifeguards","Restrooms","Food"], actions:["View Surf & Rip Risk","Get Directions"] },
  { id:"trunk", island:"St. John", name:"Trunk Bay", water_temp_f:83, rip_risk:"Low",
    surf_ft:1.0, amenities:["Snorkel trail","Parking","Food"], actions:["View Surf & Rip Risk","Get Directions"] },
  { id:"coki", island:"St. Thomas", name:"Coki Point", water_temp_f:82, rip_risk:"Moderate",
    surf_ft:2.3, amenities:["Diving","Vendors"], actions:["View Surf & Rip Risk","Get Directions"] },
  { id:"sandy", island:"St. Croix", name:"Sandy Point", water_temp_f:84, rip_risk:"Moderate",
    surf_ft:2.0, amenities:["Wildlife refuge"], actions:["View Surf & Rip Risk","Get Directions"] },
];

const EVENTS: EventItem[] = [
  { id:"stt_carnival", title:"St. Thomas Carnival Parade", type:"Festival",
    island:"St. Thomas", date:"2025-04-26", location:"Main Street", price_usd:0,
    actions:["Get Directions","Call Driver","Book Tickets"] },
  { id:"stj_music", title:"Love City Music Fest", type:"Concert",
    island:"St. John", date:"2025-05-10", location:"Cruz Bay", price_usd:65,
    actions:["Get Directions","Call Driver","Book Tickets"] },
  { id:"stx_regatta", title:"St. Croix Regatta", type:"Regatta",
    island:"St. Croix", date:"2025-06-08", location:"Teague Bay", price_usd:25,
    actions:["Get Directions","Call Driver","Book Tickets"] },
  { id:"culinary_night", title:"Culinary Night Market", type:"Culinary",
    island:"St. Thomas", date:"2025-04-18", location:"Havensight", price_usd:10,
    actions:["Get Directions","Call Driver","Book Tickets"] },
];

/* ────────────── Tool handlers ────────────── */
function tool_health() {
  return { ok: true, name: "rasta-gpt-concierge-node",
    tools: ["find_recipe","book_catering","get_beach_conditions","find_events","request_ride"] };
}
function tool_find_recipe(args: { query?: string }) {
  const q = (args?.query || "").toLowerCase();
  if (!q) return RECIPES;
  return RECIPES.filter(r =>
    r.name.toLowerCase().includes(q) || r.ingredients.some(i => i.toLowerCase().includes(q))
  );
}
function tool_book_catering(args: { request: { recipe_id: string; guests: number; date?: string }}) {
  const req = args?.request; if (!req?.recipe_id) return { ok:false, error:"recipe_not_found" };
  const r = RECIPES.find(x => x.id === req.recipe_id); if (!r) return { ok:false, error:"recipe_not_found" };
  const est = +(r.price_usd * (req.guests ?? 1) * 1.10).toFixed(2);
  const confirmation = `USVI-${Date.now().toString().slice(-6)}-${Math.floor(Math.random()*900+100)}`;
  return { ok:true, confirmation, estimate_usd: est, restaurant: r.restaurant };
}
function tool_get_beach_conditions(args: { island?: string; name?: string }) {
  const { island, name } = args || {};
  return BEACHES.filter(b =>
    (!island || b.island.toLowerCase() === island.toLowerCase()) &&
    (!name || b.name.toLowerCase().startsWith(name.toLowerCase()))
  );
}
function tool_find_events(args: { kind?: string; island?: string; month?: number }) {
  const { kind, island, month } = args || {};
  return EVENTS.filter(e => {
    if (kind && e.type.toLowerCase() !== kind.toLowerCase() && e.type !== kind) return false;
    if (island && e.island.toLowerCase() !== island.toLowerCase()) return false;
    if (month) { const m = Number(e.date.split("-")[1]); if (m !== month) return false; }
    return true;
  });
}
function tool_request_ride(args: { request: { to: string; pax?: number; island?: string; when?: string }}) {
  const r = args?.request || { to: "" }; if (!r.to) return { ok:false, error:"missing_destination" };
  const base = 12, perPax = 4.5, surge = (r.when === "ASAP") ? 1.0 : 0.9;
  const fare = +((base + perPax * Math.max(0, (r.pax ?? 1) - 1)) * surge).toFixed(2);
  const code = `RG${1000 + Math.floor(Math.random()*9000)}`;
  return { ok:true, to:r.to, pax:r.pax ?? 1, island:r.island ?? "St. Thomas", when:r.when ?? "ASAP",
           fare_estimate_usd: fare, confirmation: code,
           driver: { name:"Island Driver", phone:"+1-340-555-1212" } };
}

/* ────────────── Express app ────────────── */
const app = express();

app.use(cors({
  origin: ["http://localhost:3000", "https://rasta-gpt-concierge.vercel.app"],
  methods: ["GET","POST"],
}));
app.use(express.json());
app.use(morgan("dev"));
app.use(rateLimit({ windowMs: 60_000, max: 60 }));

/* ────────────── Sentry (SDK v10-safe, no Express middleware) ────────────── */
let sentryEnabled = false;
if (process.env.SENTRY_DSN) {
  try {
    Sentry.init({
      dsn: process.env.SENTRY_DSN,
      environment: process.env.SENTRY_ENVIRONMENT ?? "production",
      tracesSampleRate: Number(process.env.SENTRY_TRACES_SAMPLE_RATE ?? 0.2),
      profilesSampleRate: Number(process.env.SENTRY_PROFILES_SAMPLE_RATE ?? 0.1),
      integrations: [
        nodeProfilingIntegration(),
        Sentry.httpIntegration(), // traces outbound http calls
      ],
    });
    sentryEnabled = true;
  } catch {
    sentryEnabled = false; // run without Sentry if init fails
  }
}

/* ────────────── Routes ────────────── */
app.get("/", (_req: Request, res: Response) => {
  res.type("html").send(
`<pre>Concierge Server is running
Routes:
  GET  /health
  POST /invoke
</pre>`
  );
});

app.get("/health", (_req: Request, res: Response) => res.json(tool_health()));

function invokeHandler(req: Request, res: Response) {
  const { name, arguments: args } = (req.body || {}) as { name?: string; arguments?: any };
  try {
    switch (name) {
      case "health":               return res.json(tool_health());
      case "find_recipe":          return res.json(tool_find_recipe(args || {}));
      case "book_catering":        return res.json(tool_book_catering(args || {}));
      case "get_beach_conditions": return res.json(tool_get_beach_conditions(args || {}));
      case "find_events":          return res.json(tool_find_events(args || {}));
      case "request_ride":         return res.json(tool_request_ride(args || {}));
      default:
        return res.status(400).json({ ok:false, error:"unknown_tool", name });
    }
  } catch (e:any) {
    if (sentryEnabled) Sentry.captureException(e);
    return res.status(500).json({ ok:false, error:"server_error", detail:e?.message });
  }
}

app.post("/invoke", invokeHandler);
app.post("/tools/invoke", invokeHandler);
app.post("/sse/tools/invoke", invokeHandler);
app.post("/sse/invoke", invokeHandler);

/* ────────────── Fallback error handler ────────────── */
app.use((err: any, _req: Request, res: Response, _next: any) => {
  if (sentryEnabled && err) Sentry.captureException(err);
  res.status(500).json({ ok: false, error: "server_error" });
});

const PORT = Number(process.env.PORT || 3333);
app.listen(PORT, "0.0.0.0", () => {
  console.log(`[Concierge] listening on http://0.0.0.0:${PORT} (POST /invoke)`);
});
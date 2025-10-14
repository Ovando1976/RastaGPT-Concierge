import type { EventItem } from "../types";

export const EVENTS: EventItem[] = [
  { id: "stt_carnival", title: "St. Thomas Carnival Parade", type: "Festival",
    island: "St. Thomas", date: "2025-04-26", location: "Main Street", price_usd: 0,
    actions: ["Get Directions","Call Driver","Book Tickets"] },
  { id: "stj_music", title: "Love City Music Fest", type: "Concert",
    island: "St. John", date: "2025-05-10", location: "Cruz Bay", price_usd: 65,
    actions: ["Get Directions","Call Driver","Book Tickets"] },
  { id: "stx_regatta", title: "St. Croix Regatta", type: "Regatta",
    island: "St. Croix", date: "2025-06-08", location: "Teague Bay", price_usd: 25,
    actions: ["Get Directions","Call Driver","Book Tickets"] },
  { id: "culinary_night", title: "Culinary Night Market", type: "Culinary",
    island: "St. Thomas", date: "2025-04-18", location: "Havensight", price_usd: 10,
    actions: ["Get Directions","Call Driver","Book Tickets"] },
];
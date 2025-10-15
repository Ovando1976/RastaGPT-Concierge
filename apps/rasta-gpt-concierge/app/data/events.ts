import { EventItem } from "../types";

export const EVENTS: EventItem[] = [
  { id:"stt_carnival", title:"St. Thomas Carnival Parade", type:"Festival",
    island:"St. Thomas", date:"2025-04-26", location:"Main Street", price_usd:0,
    actions:["Get Directions","Call Driver","Book Tickets"], imageUrl: "/images/events/stt-carnival.jpg" },
  { id:"stj_music", title:"Love City Music Fest", type:"Concert",
    island:"St. John", date:"2025-05-10", location:"Cruz Bay", price_usd:65,
    actions:["Get Directions","Call Driver","Book Tickets"], imageUrl: "/images/events/love-city.jpg" },
  { id:"stx_regatta", title:"St. Croix Regatta", type:"Regatta",
    island:"St. Croix", date:"2025-06-08", location:"Teague Bay", price_usd:25,
    actions:["Get Directions","Call Driver","Book Tickets"], imageUrl: "/images/events/stx-regatta.jpg" }
];
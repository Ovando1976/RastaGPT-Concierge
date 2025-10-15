import type { Beach } from "../types";

export const BEACHES: Beach[] = [
  { id:"magens", island:"St. Thomas", name:"Magens Bay", water_temp_f:82, rip_risk:"Low",
    surf_ft:1.2, amenities:["Lifeguards","Restrooms","Food"], actions:["View Surf & Rip Risk","Get Directions"],
    imageUrl: "/images/beaches/magens-bay.jpg" },
  { id:"trunk", island:"St. John", name:"Trunk Bay", water_temp_f:83, rip_risk:"Low",
    surf_ft:1.0, amenities:["Snorkel trail","Parking","Food"], actions:["View Surf & Rip Risk","Get Directions"],
    imageUrl: "/images/beaches/trunk-bay.jpg" },
  { id:"coki", island:"St. Thomas", name:"Coki Point", water_temp_f:82, rip_risk:"Moderate",
    surf_ft:2.3, amenities:["Diving","Vendors"], actions:["View Surf & Rip Risk","Get Directions"],
    imageUrl: "/images/beaches/coki-point.jpg" }
];
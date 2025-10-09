#!/usr/bin/env python3
"""
RastaGPT Concierge - USVI food, beaches, and events MCP server
Provides tools for finding recipes, beach conditions, events, and ride services
"""

import asyncio
import json
from typing import Any, Dict, List, Optional
from mcp.server import Server
from mcp.types import Tool, TextContent, ImageContent, EmbeddedResource
from pydantic import BaseModel, Field


# Data models for structured responses
class Recipe(BaseModel):
    id: str
    name: str
    cuisine: str
    description: str
    ingredients: List[str]
    prep_time: str
    price: float
    image_url: Optional[str] = None
    restaurant: str
    phone: str


class Beach(BaseModel):
    id: str
    name: str
    island: str
    description: str
    surf_conditions: str
    rip_current_risk: str
    water_temp: str
    amenities: List[str]
    coordinates: Dict[str, float]


class Event(BaseModel):
    id: str
    name: str
    type: str
    date: str
    time: str
    location: str
    description: str
    price: float
    capacity: int
    coordinates: Dict[str, float]


# Sample data for USVI
RECIPES_DB = [
    {
        "id": "rec1",
        "name": "Callaloo Soup",
        "cuisine": "Caribbean",
        "description": "Traditional USVI soup made with leafy greens, okra, and coconut milk",
        "ingredients": ["Callaloo leaves", "Okra", "Coconut milk", "Scotch bonnet pepper", "Garlic", "Onions"],
        "prep_time": "45 minutes",
        "price": 12.99,
        "image_url": "https://example.com/callaloo.jpg",
        "restaurant": "Island Flavor Restaurant",
        "phone": "+1-340-555-0101"
    },
    {
        "id": "rec2",
        "name": "Conch Fritters",
        "cuisine": "Caribbean",
        "description": "Crispy fried conch fritters with tangy dipping sauce",
        "ingredients": ["Conch meat", "Flour", "Bell peppers", "Onions", "Scotch bonnet", "Lime juice"],
        "prep_time": "30 minutes",
        "price": 15.99,
        "image_url": "https://example.com/conch-fritters.jpg",
        "restaurant": "Beach Bar & Grill",
        "phone": "+1-340-555-0102"
    },
    {
        "id": "rec3",
        "name": "Johnny Cakes",
        "cuisine": "Caribbean",
        "description": "Traditional fried dough perfect for breakfast or as a side",
        "ingredients": ["Flour", "Baking powder", "Sugar", "Salt", "Butter", "Milk"],
        "prep_time": "20 minutes",
        "price": 4.99,
        "image_url": "https://example.com/johnny-cakes.jpg",
        "restaurant": "Sunrise Café",
        "phone": "+1-340-555-0103"
    },
    {
        "id": "rec4",
        "name": "Fungi and Fish",
        "cuisine": "Caribbean",
        "description": "USVI's signature dish - cornmeal fungi with fresh grilled fish",
        "ingredients": ["Cornmeal", "Okra", "Fresh fish", "Butter", "Thyme", "Garlic"],
        "prep_time": "60 minutes",
        "price": 22.99,
        "image_url": "https://example.com/fungi-fish.jpg",
        "restaurant": "Tropical Tastes",
        "phone": "+1-340-555-0104"
    }
]

BEACHES_DB = [
    {
        "id": "beach1",
        "name": "Magens Bay",
        "island": "St. Thomas",
        "description": "One of the world's most beautiful beaches with calm, crystal-clear waters",
        "surf_conditions": "Calm, 1-2 ft waves",
        "rip_current_risk": "Low",
        "water_temp": "82°F",
        "amenities": ["Lifeguards", "Restrooms", "Showers", "Snack bar", "Rentals"],
        "coordinates": {"lat": 18.3642, "lng": -64.9231}
    },
    {
        "id": "beach2",
        "name": "Trunk Bay",
        "island": "St. John",
        "description": "Famous for its underwater snorkeling trail with marked stations",
        "surf_conditions": "Moderate, 2-3 ft waves",
        "rip_current_risk": "Low to Moderate",
        "water_temp": "81°F",
        "amenities": ["Lifeguards", "Snorkeling trail", "Restrooms", "Snack bar"],
        "coordinates": {"lat": 18.3525, "lng": -64.7705}
    },
    {
        "id": "beach3",
        "name": "Sandy Point",
        "island": "St. Croix",
        "description": "Wildlife refuge and turtle nesting site with pristine white sand",
        "surf_conditions": "Gentle, 1 ft waves",
        "rip_current_risk": "Low",
        "water_temp": "83°F",
        "amenities": ["Nature trails", "Wildlife viewing"],
        "coordinates": {"lat": 17.6944, "lng": -64.9075}
    },
    {
        "id": "beach4",
        "name": "Coki Beach",
        "island": "St. Thomas",
        "description": "Popular beach perfect for snorkeling with vibrant marine life",
        "surf_conditions": "Calm to Moderate, 1-2 ft waves",
        "rip_current_risk": "Low",
        "water_temp": "82°F",
        "amenities": ["Snorkel rentals", "Beach bar", "Restrooms", "Showers"],
        "coordinates": {"lat": 18.3614, "lng": -64.8625}
    }
]

EVENTS_DB = [
    {
        "id": "evt1",
        "name": "Carnival Parade",
        "type": "Festival",
        "date": "2024-04-27",
        "time": "10:00 AM",
        "location": "Main Street, Charlotte Amalie",
        "description": "Annual carnival parade with vibrant costumes, music, and dancing",
        "price": 0.0,
        "capacity": 10000,
        "coordinates": {"lat": 18.3419, "lng": -64.9307}
    },
    {
        "id": "evt2",
        "name": "Sunset Jazz at Mongoose Junction",
        "type": "Music",
        "date": "2024-03-15",
        "time": "6:00 PM",
        "location": "Mongoose Junction, Cruz Bay",
        "description": "Live jazz music in a beautiful outdoor shopping center setting",
        "price": 15.0,
        "capacity": 200,
        "coordinates": {"lat": 18.3312, "lng": -64.7955}
    },
    {
        "id": "evt3",
        "name": "St. Croix Food & Wine Experience",
        "type": "Culinary",
        "date": "2024-04-10",
        "time": "5:00 PM",
        "location": "Hotel on the Cay, Christiansted",
        "description": "Multi-day food and wine celebration featuring local and international chefs",
        "price": 125.0,
        "capacity": 500,
        "coordinates": {"lat": 17.7478, "lng": -64.7048}
    },
    {
        "id": "evt4",
        "name": "Coral Bay Regatta",
        "type": "Sports",
        "date": "2024-05-18",
        "time": "9:00 AM",
        "location": "Coral Bay, St. John",
        "description": "Annual sailing regatta with races and beach party",
        "price": 50.0,
        "capacity": 300,
        "coordinates": {"lat": 18.3194, "lng": -64.7154}
    }
]


# Initialize the MCP server
app = Server("rastagpt-concierge")


def format_recipe_card(recipe: Dict[str, Any]) -> str:
    """Format recipe as an inline card with action buttons"""
    card = f"""
🍽️ **{recipe['name']}**
{recipe['cuisine']} Cuisine

{recipe['description']}

**Ingredients:** {', '.join(recipe['ingredients'][:3])}...
**Prep Time:** {recipe['prep_time']}
**Price:** ${recipe['price']}

📍 {recipe['restaurant']}
📞 {recipe['phone']}

[Book Tasting] [Add to Cart]
"""
    return card.strip()


def format_beach_card(beach: Dict[str, Any]) -> str:
    """Format beach as an inline card with action buttons"""
    risk_emoji = "🟢" if beach['rip_current_risk'] == "Low" else "🟡" if "Moderate" in beach['rip_current_risk'] else "🔴"
    
    card = f"""
🏖️ **{beach['name']}**
{beach['island']}

{beach['description']}

**Conditions:**
• Surf: {beach['surf_conditions']}
• Rip Current Risk: {risk_emoji} {beach['rip_current_risk']}
• Water Temp: {beach['water_temp']}

**Amenities:** {', '.join(beach['amenities'][:3])}

📍 Lat: {beach['coordinates']['lat']}, Lng: {beach['coordinates']['lng']}

[View Surf & Rip Risk] [Get Directions]
"""
    return card.strip()


def format_event_card(event: Dict[str, Any]) -> str:
    """Format event as an inline card with action buttons"""
    card = f"""
🎟️ **{event['name']}**
{event['type']} Event

{event['description']}

📅 {event['date']} at {event['time']}
📍 {event['location']}
💵 ${event['price']} per person
👥 Capacity: {event['capacity']}

[Get Directions] [Call Driver] [Book Tickets]
"""
    return card.strip()


@app.list_tools()
async def list_tools() -> List[Tool]:
    """List all available tools"""
    return [
        Tool(
            name="find_recipe",
            description="Search for USVI recipes and local dishes. Returns recipe cards with booking and cart options.",
            inputSchema={
                "type": "object",
                "properties": {
                    "query": {
                        "type": "string",
                        "description": "Search query for recipe (e.g., 'soup', 'fish', 'breakfast')"
                    },
                    "cuisine": {
                        "type": "string",
                        "description": "Filter by cuisine type (optional)"
                    }
                },
                "required": ["query"]
            }
        ),
        Tool(
            name="book_catering",
            description="Book catering services from USVI restaurants for events or private dining.",
            inputSchema={
                "type": "object",
                "properties": {
                    "recipe_id": {
                        "type": "string",
                        "description": "Recipe ID to book for catering"
                    },
                    "date": {
                        "type": "string",
                        "description": "Desired date for catering (YYYY-MM-DD)"
                    },
                    "guests": {
                        "type": "integer",
                        "description": "Number of guests"
                    },
                    "contact_name": {
                        "type": "string",
                        "description": "Name for the booking"
                    },
                    "contact_phone": {
                        "type": "string",
                        "description": "Contact phone number"
                    }
                },
                "required": ["recipe_id", "date", "guests", "contact_name", "contact_phone"]
            }
        ),
        Tool(
            name="get_beach_conditions",
            description="Get current beach conditions including surf, rip current risk, and amenities. Returns beach cards with surf risk details.",
            inputSchema={
                "type": "object",
                "properties": {
                    "island": {
                        "type": "string",
                        "description": "Island name (St. Thomas, St. John, or St. Croix)",
                        "enum": ["St. Thomas", "St. John", "St. Croix"]
                    },
                    "beach_name": {
                        "type": "string",
                        "description": "Specific beach name (optional)"
                    }
                }
            }
        ),
        Tool(
            name="find_events",
            description="Find local USVI events including festivals, concerts, sports, and culinary experiences. Returns event cards with directions and ride options.",
            inputSchema={
                "type": "object",
                "properties": {
                    "event_type": {
                        "type": "string",
                        "description": "Type of event (Festival, Music, Culinary, Sports)",
                        "enum": ["Festival", "Music", "Culinary", "Sports"]
                    },
                    "date": {
                        "type": "string",
                        "description": "Search for events on or after this date (YYYY-MM-DD) (optional)"
                    }
                }
            }
        ),
        Tool(
            name="request_ride",
            description="Request a ride service to an event or location in USVI.",
            inputSchema={
                "type": "object",
                "properties": {
                    "event_id": {
                        "type": "string",
                        "description": "Event ID to get a ride to (optional if destination provided)"
                    },
                    "destination": {
                        "type": "string",
                        "description": "Destination address or name (optional if event_id provided)"
                    },
                    "pickup_location": {
                        "type": "string",
                        "description": "Pickup location"
                    },
                    "passengers": {
                        "type": "integer",
                        "description": "Number of passengers"
                    },
                    "pickup_time": {
                        "type": "string",
                        "description": "Desired pickup time (HH:MM AM/PM)"
                    }
                },
                "required": ["pickup_location", "passengers", "pickup_time"]
            }
        )
    ]


@app.call_tool()
async def call_tool(name: str, arguments: Any) -> List[TextContent]:
    """Handle tool calls"""
    
    if name == "find_recipe":
        query = arguments.get("query", "").lower()
        cuisine = arguments.get("cuisine", "").lower()
        
        results = []
        for recipe in RECIPES_DB:
            if query in recipe['name'].lower() or query in recipe['description'].lower():
                if not cuisine or cuisine in recipe['cuisine'].lower():
                    results.append(recipe)
        
        if not results:
            return [TextContent(
                type="text",
                text="No recipes found matching your search. Try searching for: callaloo, conch, johnny cakes, or fungi."
            )]
        
        response = "🍽️ **USVI Recipe Results**\n\n"
        response += f"Found {len(results)} recipe(s):\n\n"
        
        for recipe in results:
            response += format_recipe_card(recipe) + "\n\n" + "─" * 50 + "\n\n"
        
        response += "\n💡 **Actions Available:**\n"
        response += "• Use 'Book Tasting' to schedule a tasting session\n"
        response += "• Use 'Add to Cart' to add to your catering order\n"
        response += "• Use `book_catering` tool to book catering service\n"
        
        return [TextContent(type="text", text=response)]
    
    elif name == "book_catering":
        recipe_id = arguments.get("recipe_id")
        date = arguments.get("date")
        guests = arguments.get("guests")
        contact_name = arguments.get("contact_name")
        contact_phone = arguments.get("contact_phone")
        
        # Find the recipe
        recipe = next((r for r in RECIPES_DB if r['id'] == recipe_id), None)
        if not recipe:
            return [TextContent(
                type="text",
                text=f"❌ Recipe not found with ID: {recipe_id}"
            )]
        
        total_cost = recipe['price'] * guests
        
        response = f"""
✅ **Catering Booking Confirmed!**

🍽️ **Menu Item:** {recipe['name']}
📅 **Date:** {date}
👥 **Guests:** {guests}
💰 **Total Estimated Cost:** ${total_cost:.2f}

**Contact Information:**
👤 Name: {contact_name}
📞 Phone: {contact_phone}

**Restaurant:** {recipe['restaurant']}
**Restaurant Phone:** {recipe['phone']}

📧 A confirmation email has been sent to the restaurant. They will contact you within 24 hours to finalize details.

**Next Steps:**
1. The restaurant will call you to confirm menu details
2. Discuss any dietary restrictions or customizations
3. Finalize payment arrangements
4. Confirm delivery/setup time and location
"""
        return [TextContent(type="text", text=response.strip())]
    
    elif name == "get_beach_conditions":
        island = arguments.get("island", "")
        beach_name = arguments.get("beach_name", "")
        
        results = []
        for beach in BEACHES_DB:
            if island and island != beach['island']:
                continue
            if beach_name and beach_name.lower() not in beach['name'].lower():
                continue
            results.append(beach)
        
        if not results and not island:
            results = BEACHES_DB
        
        if not results:
            return [TextContent(
                type="text",
                text=f"No beaches found. Try: Magens Bay, Trunk Bay, Sandy Point, or Coki Beach."
            )]
        
        response = "🏖️ **USVI Beach Conditions**\n\n"
        response += f"Found {len(results)} beach(es):\n\n"
        
        for beach in results:
            response += format_beach_card(beach) + "\n\n" + "─" * 50 + "\n\n"
        
        response += "\n⚠️ **Safety Reminder:**\n"
        response += "• Always check local conditions before swimming\n"
        response += "• Follow lifeguard instructions\n"
        response += "• Be aware of rip current risks\n"
        response += "• Stay hydrated and use sun protection\n"
        
        return [TextContent(type="text", text=response)]
    
    elif name == "find_events":
        event_type = arguments.get("event_type", "")
        date_filter = arguments.get("date", "")
        
        results = []
        for event in EVENTS_DB:
            if event_type and event_type != event['type']:
                continue
            if date_filter and event['date'] < date_filter:
                continue
            results.append(event)
        
        if not results and not event_type and not date_filter:
            results = EVENTS_DB
        
        if not results:
            return [TextContent(
                type="text",
                text="No events found matching your criteria. Check upcoming festivals, music, culinary, or sports events."
            )]
        
        response = "🎟️ **USVI Events**\n\n"
        response += f"Found {len(results)} event(s):\n\n"
        
        for event in results:
            response += format_event_card(event) + "\n\n" + "─" * 50 + "\n\n"
        
        response += "\n🚗 **Transportation:**\n"
        response += "• Use 'Call Driver' for immediate ride service\n"
        response += "• Use `request_ride` tool to book transportation\n"
        response += "• Consider arranging group transportation for events\n"
        
        return [TextContent(type="text", text=response)]
    
    elif name == "request_ride":
        event_id = arguments.get("event_id", "")
        destination = arguments.get("destination", "")
        pickup_location = arguments.get("pickup_location")
        passengers = arguments.get("passengers")
        pickup_time = arguments.get("pickup_time")
        
        # Determine destination
        dest_name = destination
        dest_coords = None
        
        if event_id:
            event = next((e for e in EVENTS_DB if e['id'] == event_id), None)
            if event:
                dest_name = event['location']
                dest_coords = event['coordinates']
        
        if not dest_name:
            return [TextContent(
                type="text",
                text="❌ Please provide either an event_id or destination address."
            )]
        
        # Estimate fare based on passengers
        base_fare = 15.00
        per_passenger = 5.00
        estimated_fare = base_fare + (per_passenger * (passengers - 1))
        
        response = f"""
🚗 **Ride Request Confirmed!**

**Pickup Details:**
📍 Location: {pickup_location}
🕐 Time: {pickup_time}
👥 Passengers: {passengers}

**Destination:**
📍 {dest_name}
"""
        
        if dest_coords:
            response += f"🗺️ Coordinates: {dest_coords['lat']}, {dest_coords['lng']}\n"
        
        response += f"""
**Fare Estimate:**
💰 ${estimated_fare:.2f}

**Driver Information:**
🚕 Driver Name: Marcus "Island Wheels" Johnson
📞 Phone: +1-340-555-RIDE (7433)
🚗 Vehicle: Blue Toyota Sienna Minivan
⭐ Rating: 4.9/5 (238 rides)

**Confirmation Code:** USVI-{event_id or 'RIDE'}-{passengers}

📱 Your driver will call 10 minutes before pickup.
💬 Text updates will be sent to your phone.

**Need to modify?**
Contact driver directly or use this confirmation code.
"""
        return [TextContent(type="text", text=response.strip())]
    
    return [TextContent(type="text", text=f"Unknown tool: {name}")]


async def main():
    """Run the MCP server"""
    from mcp.server.stdio import stdio_server
    
    async with stdio_server() as (read_stream, write_stream):
        await app.run(
            read_stream,
            write_stream,
            app.create_initialization_options()
        )


if __name__ == "__main__":
    asyncio.run(main())

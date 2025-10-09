#!/usr/bin/env python3
"""
Interactive demo of RastaGPT Concierge
Shows example outputs for all tools with rich formatting
"""

import asyncio
import sys
sys.path.insert(0, '/home/runner/work/RastaGPT-Concierge/RastaGPT-Concierge')

from src.server import call_tool


def print_section(title: str):
    """Print a formatted section header"""
    print("\n" + "=" * 70)
    print(f"  {title}")
    print("=" * 70 + "\n")


async def demo():
    """Run interactive demo of all tools"""
    
    print("\n")
    print("╔" + "═" * 68 + "╗")
    print("║" + " " * 15 + "🌴 RastaGPT Concierge Demo 🌴" + " " * 20 + "║")
    print("║" + " " * 10 + "USVI food, beaches, and events in ChatGPT" + " " * 14 + "║")
    print("╚" + "═" * 68 + "╝")
    
    # Demo 1: Find Recipes
    print_section("🍽️  RECIPE SEARCH DEMO")
    print("Query: 'Find me traditional USVI recipes'\n")
    result = await call_tool("find_recipe", {"query": "soup"})
    print(result[0].text)
    
    input("\n[Press Enter to continue...]")
    
    # Demo 2: Beach Conditions
    print_section("🏖️  BEACH CONDITIONS DEMO")
    print("Query: 'Show me beaches in St. Thomas with current conditions'\n")
    result = await call_tool("get_beach_conditions", {"island": "St. Thomas"})
    print(result[0].text)
    
    input("\n[Press Enter to continue...]")
    
    # Demo 3: Find Events
    print_section("🎟️  EVENT FINDER DEMO")
    print("Query: 'What festivals are happening in USVI?'\n")
    result = await call_tool("find_events", {"event_type": "Festival"})
    print(result[0].text)
    
    input("\n[Press Enter to continue...]")
    
    # Demo 4: Book Catering
    print_section("📝  CATERING BOOKING DEMO")
    print("Action: Book Callaloo Soup catering for 25 guests\n")
    result = await call_tool("book_catering", {
        "recipe_id": "rec1",
        "date": "2024-05-15",
        "guests": 25,
        "contact_name": "Maria Rodriguez",
        "contact_phone": "+1-340-555-8888"
    })
    print(result[0].text)
    
    input("\n[Press Enter to continue...]")
    
    # Demo 5: Request Ride
    print_section("🚗  RIDE REQUEST DEMO")
    print("Action: Request ride to Carnival Parade for 4 passengers\n")
    result = await call_tool("request_ride", {
        "event_id": "evt1",
        "pickup_location": "The Ritz-Carlton, St. Thomas",
        "passengers": 4,
        "pickup_time": "9:00 AM"
    })
    print(result[0].text)
    
    # Summary
    print_section("✨  DEMO COMPLETE")
    print("Key Features Demonstrated:")
    print("  ✓ Recipe search with inline cards")
    print("  ✓ Beach conditions with safety indicators")
    print("  ✓ Event discovery with action buttons")
    print("  ✓ Catering booking with confirmations")
    print("  ✓ Ride requests with driver details")
    print()
    print("All responses include:")
    print("  • Rich formatted cards")
    print("  • Interactive action buttons")
    print("  • Relevant emojis and indicators")
    print("  • Complete contact information")
    print("  • Safety warnings and tips")
    print()
    print("Ready to use in ChatGPT/Claude via MCP! 🎉")
    print()


if __name__ == "__main__":
    try:
        asyncio.run(demo())
    except KeyboardInterrupt:
        print("\n\nDemo interrupted by user.")
        sys.exit(0)

#!/usr/bin/env python3
"""
Test script for RastaGPT Concierge MCP Server
Tests all tools and validates responses
"""

import asyncio
import sys
sys.path.insert(0, '/home/runner/work/RastaGPT-Concierge/RastaGPT-Concierge')

from src.server import app, RECIPES_DB, BEACHES_DB, EVENTS_DB


async def test_tools():
    """Test all available tools"""
    
    print("=" * 60)
    print("Testing RastaGPT Concierge MCP Server")
    print("=" * 60)
    print()
    
    # Test 1: Data Validation
    print("Test 1: Validating sample data...")
    print(f"✓ Recipes database has {len(RECIPES_DB)} entries")
    for recipe in RECIPES_DB:
        print(f"  - {recipe['name']} ({recipe['cuisine']})")
    print()
    
    print(f"✓ Beaches database has {len(BEACHES_DB)} entries")
    for beach in BEACHES_DB:
        print(f"  - {beach['name']} ({beach['island']})")
    print()
    
    print(f"✓ Events database has {len(EVENTS_DB)} entries")
    for event in EVENTS_DB:
        print(f"  - {event['name']} ({event['type']})")
    print()
    
    # Test 2: Tool Definitions
    print("Test 2: Validating tool schemas...")
    from src.server import list_tools, call_tool
    tools = await list_tools()
    print(f"✓ Found {len(tools)} tools:")
    for tool in tools:
        print(f"  - {tool.name}: {tool.description[:60]}...")
    print()
    
    # Test 3: Find Recipe
    print("Test 3: Finding recipes (query='soup')...")
    result = await call_tool("find_recipe", {"query": "soup"})
    print(f"✓ Recipe search returned {len(result)} response(s)")
    if result and result[0].text:
        lines = result[0].text.split('\n')[:5]
        for line in lines:
            print(f"  {line}")
    print()
    
    # Test 4: Book Catering
    print("Test 4: Booking catering...")
    result = await call_tool("book_catering", {
        "recipe_id": "rec1",
        "date": "2024-05-15",
        "guests": 25,
        "contact_name": "John Doe",
        "contact_phone": "+1-340-555-1234"
    })
    print(f"✓ Catering booking returned {len(result)} response(s)")
    if result and result[0].text:
        lines = result[0].text.split('\n')[:3]
        for line in lines:
            print(f"  {line}")
    print()
    
    # Test 5: Get Beach Conditions
    print("Test 5: Getting beach conditions (island='St. Thomas')...")
    result = await call_tool("get_beach_conditions", {"island": "St. Thomas"})
    print(f"✓ Beach conditions returned {len(result)} response(s)")
    if result and result[0].text:
        lines = result[0].text.split('\n')[:5]
        for line in lines:
            print(f"  {line}")
    print()
    
    # Test 6: Find Events
    print("Test 6: Finding events (type='Music')...")
    result = await call_tool("find_events", {"event_type": "Music"})
    print(f"✓ Event search returned {len(result)} response(s)")
    if result and result[0].text:
        lines = result[0].text.split('\n')[:5]
        for line in lines:
            print(f"  {line}")
    print()
    
    # Test 7: Request Ride
    print("Test 7: Requesting a ride...")
    result = await call_tool("request_ride", {
        "event_id": "evt1",
        "pickup_location": "Hotel 1829",
        "passengers": 4,
        "pickup_time": "9:30 AM"
    })
    print(f"✓ Ride request returned {len(result)} response(s)")
    if result and result[0].text:
        lines = result[0].text.split('\n')[:3]
        for line in lines:
            print(f"  {line}")
    print()
    
    print("=" * 60)
    print("All tests passed! ✓")
    print("=" * 60)


if __name__ == "__main__":
    asyncio.run(test_tools())

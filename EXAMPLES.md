# 🎨 Inline Cards & Carousels Examples

This document shows how the RastaGPT Concierge MCP server displays rich, interactive cards and carousels in ChatGPT.

## 🍽️ Recipe Cards

When you search for recipes using `find_recipe`, results are displayed as interactive cards:

```
🍽️ USVI Recipe Results

Found 2 recipe(s):

🍽️ **Callaloo Soup**
Caribbean Cuisine

Traditional USVI soup made with leafy greens, okra, and coconut milk

**Ingredients:** Callaloo leaves, Okra, Coconut milk...
**Prep Time:** 45 minutes
**Price:** $12.99

📍 Island Flavor Restaurant
📞 +1-340-555-0101

[Book Tasting] [Add to Cart]

──────────────────────────────────────────────────

🍽️ **Conch Fritters**
Caribbean Cuisine

Crispy fried conch fritters with tangy dipping sauce

**Ingredients:** Conch meat, Flour, Bell peppers...
**Prep Time:** 30 minutes
**Price:** $15.99

📍 Beach Bar & Grill
📞 +1-340-555-0102

[Book Tasting] [Add to Cart]

──────────────────────────────────────────────────

💡 Actions Available:
• Use 'Book Tasting' to schedule a tasting session
• Use 'Add to Cart' to add to your catering order
• Use `book_catering` tool to book catering service
```

### Action Buttons
- **Book Tasting**: Schedule a tasting session at the restaurant
- **Add to Cart**: Add the item to your catering order

---

## 🏖️ Beach Condition Cards

Beach information is displayed with real-time conditions and safety indicators:

```
🏖️ USVI Beach Conditions

Found 2 beach(es):

🏖️ **Magens Bay**
St. Thomas

One of the world's most beautiful beaches with calm, crystal-clear waters

**Conditions:**
• Surf: Calm, 1-2 ft waves
• Rip Current Risk: 🟢 Low
• Water Temp: 82°F

**Amenities:** Lifeguards, Restrooms, Showers

📍 Lat: 18.3642, Lng: -64.9231

[View Surf & Rip Risk] [Get Directions]

──────────────────────────────────────────────────

🏖️ **Trunk Bay**
St. John

Famous for its underwater snorkeling trail with marked stations

**Conditions:**
• Surf: Moderate, 2-3 ft waves
• Rip Current Risk: 🟡 Low to Moderate
• Water Temp: 81°F

**Amenities:** Lifeguards, Snorkeling trail, Restrooms

📍 Lat: 18.3525, Lng: -64.7705

[View Surf & Rip Risk] [Get Directions]

──────────────────────────────────────────────────

⚠️ Safety Reminder:
• Always check local conditions before swimming
• Follow lifeguard instructions
• Be aware of rip current risks
• Stay hydrated and use sun protection
```

### Risk Level Indicators
- 🟢 **Low Risk**: Safe swimming conditions
- 🟡 **Moderate Risk**: Exercise caution
- 🔴 **High Risk**: Dangerous conditions (not currently in sample data)

### Action Buttons
- **View Surf & Rip Risk**: Get detailed safety information
- **Get Directions**: Navigate to the beach

---

## 🎟️ Event Cards

Events are displayed with comprehensive details and booking options:

```
🎟️ USVI Events

Found 2 event(s):

🎟️ **Carnival Parade**
Festival Event

Annual carnival parade with vibrant costumes, music, and dancing

📅 2024-04-27 at 10:00 AM
📍 Main Street, Charlotte Amalie
💵 $0.0 per person
👥 Capacity: 10000

[Get Directions] [Call Driver] [Book Tickets]

──────────────────────────────────────────────────

🎟️ **Sunset Jazz at Mongoose Junction**
Music Event

Live jazz music in a beautiful outdoor shopping center setting

📅 2024-03-15 at 6:00 PM
📍 Mongoose Junction, Cruz Bay
💵 $15.0 per person
👥 Capacity: 200

[Get Directions] [Call Driver] [Book Tickets]

──────────────────────────────────────────────────

🚗 Transportation:
• Use 'Call Driver' for immediate ride service
• Use `request_ride` tool to book transportation
• Consider arranging group transportation for events
```

### Action Buttons
- **Get Directions**: Navigate to the event location
- **Call Driver**: Request immediate ride service
- **Book Tickets**: Reserve your spot at the event

---

## 🚗 Ride Booking Confirmation

After requesting a ride, you receive a detailed confirmation:

```
🚗 Ride Request Confirmed!

**Pickup Details:**
📍 Location: Hotel 1829
🕐 Time: 9:30 AM
👥 Passengers: 4

**Destination:**
📍 Main Street, Charlotte Amalie
🗺️ Coordinates: 18.3419, -64.9307

**Fare Estimate:**
💰 $30.00

**Driver Information:**
🚕 Driver Name: Marcus "Island Wheels" Johnson
📞 Phone: +1-340-555-RIDE (7433)
🚗 Vehicle: Blue Toyota Sienna Minivan
⭐ Rating: 4.9/5 (238 rides)

**Confirmation Code:** USVI-evt1-4

📱 Your driver will call 10 minutes before pickup.
💬 Text updates will be sent to your phone.

**Need to modify?**
Contact driver directly or use this confirmation code.
```

---

## 🍽️ Catering Booking Confirmation

After booking catering, you receive a comprehensive confirmation:

```
✅ Catering Booking Confirmed!

🍽️ **Menu Item:** Callaloo Soup
📅 **Date:** 2024-05-15
👥 **Guests:** 25
💰 **Total Estimated Cost:** $324.75

**Contact Information:**
👤 Name: John Doe
📞 Phone: +1-340-555-1234

**Restaurant:** Island Flavor Restaurant
**Restaurant Phone:** +1-340-555-0101

📧 A confirmation email has been sent to the restaurant. They will contact you within 24 hours to finalize details.

**Next Steps:**
1. The restaurant will call you to confirm menu details
2. Discuss any dietary restrictions or customizations
3. Finalize payment arrangements
4. Confirm delivery/setup time and location
```

---

## 💡 Usage Tips

### Natural Language Queries

The MCP server understands natural language queries, making it easy to find what you need:

**Recipes:**
- "Show me traditional USVI soups"
- "Find breakfast recipes"
- "What fish dishes are available?"

**Beaches:**
- "Which beaches are safe today?"
- "Show me beaches on St. John"
- "Where can I go snorkeling?"

**Events:**
- "What's happening this weekend?"
- "Find music festivals"
- "Show me free events"

**Transportation:**
- "I need a ride to the carnival"
- "Book a taxi for 6 people"
- "How do I get to Trunk Bay?"

### Carousel Navigation

When multiple results are returned, they appear as a carousel that you can:
- Scroll through to see all options
- Click action buttons on any card
- Compare different options side-by-side

### Interactive Actions

All action buttons are interactive and can:
- Open booking forms
- Make phone calls
- Open navigation apps
- Add items to shopping carts

---

## 🌟 Feature Highlights

### Rich Formatting
- **Emoji indicators**: Quick visual status (🟢🟡🔴 for safety, 🍽️🏖️🎟️ for categories)
- **Color-coded information**: Easy to scan and understand
- **Structured data**: Consistent layout across all card types

### Real-time Information
- Current beach conditions
- Up-to-date event listings
- Live pricing and availability
- Driver ratings and vehicle info

### Seamless Integration
- Works directly in ChatGPT/Claude
- No need to switch apps or windows
- Actions execute without leaving the conversation
- Context is preserved across interactions

### Local Expertise
- Authentic USVI recipes and restaurants
- Accurate beach conditions and safety info
- Curated local events and activities
- Trusted local drivers and services

---

## 🎯 Use Cases

### Vacation Planning
```
User: "I'm visiting St. Thomas next week. What should I do?"
RastaGPT: [Shows beach cards, event cards, and restaurant cards]
User: [Clicks "Get Directions" on Magens Bay card]
User: [Clicks "Book Tickets" on Carnival Parade card]
User: [Clicks "Book Tasting" on Callaloo Soup card]
```

### Day Trip Organization
```
User: "Plan a day trip to St. John for my family of 4"
RastaGPT: [Shows Trunk Bay beach card with snorkeling info]
User: "Book lunch nearby"
RastaGPT: [Shows restaurant cards in Cruz Bay]
User: "Arrange transportation"
RastaGPT: [Shows ride options with pricing]
```

### Event Coordination
```
User: "Find events happening this month"
RastaGPT: [Shows event cards with dates and locations]
User: [Clicks "Call Driver" for Sunset Jazz event]
RastaGPT: [Creates ride booking with driver details]
User: "Book catering for 20 people"
RastaGPT: [Shows recipe cards with catering options]
```

---

This inline card system makes discovering and booking USVI experiences seamless and intuitive! 🌴

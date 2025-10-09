# 🌴 RastaGPT-Concierge

USVI food, beaches, and events—right inside ChatGPT.

An MCP (Model Context Protocol) server that brings the US Virgin Islands experience directly into ChatGPT with inline cards and carousels for recipes, beaches, and events.

## ✨ Features

### 🍽️ Recipes & Catering
- Search authentic USVI recipes (Callaloo Soup, Conch Fritters, Johnny Cakes, Fungi)
- View recipe cards with ingredients, prep time, and pricing
- **Interactive Actions**: "Book Tasting", "Add to Cart"
- Book catering services for events

### 🏖️ Beach Conditions
- Real-time beach conditions for St. Thomas, St. John, and St. Croix
- Surf reports and rip current risk assessments
- Beach amenities and water temperature
- **Interactive Actions**: "View Surf & Rip Risk", "Get Directions"

### 🎟️ Events & Activities
- Discover local festivals, concerts, sports events, and culinary experiences
- Event details with dates, locations, and pricing
- **Interactive Actions**: "Get Directions", "Call Driver", "Book Tickets"

### 🚗 Ride Services
- Request rides to events and attractions
- Driver information and fare estimates
- Confirmation codes and text updates

## 🛠️ Tools (MCP)

| Tool | Description |
|------|-------------|
| `find_recipe` | Search for USVI recipes and local dishes |
| `book_catering` | Book catering services from USVI restaurants |
| `get_beach_conditions` | Get current beach conditions including surf & rip risk |
| `find_events` | Find local USVI events and activities |
| `request_ride` | Request ride services to events or locations |

## 📦 Installation

1. **Install dependencies:**
```bash
pip install -r requirements.txt
```

2. **Configure in Claude Desktop:**

Edit your Claude Desktop config file:
- **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

Add the server configuration:
```json
{
  "mcpServers": {
    "rastagpt-concierge": {
      "command": "python",
      "args": ["/absolute/path/to/RastaGPT-Concierge/src/server.py"]
    }
  }
}
```

3. **Restart Claude Desktop**

## 🚀 Usage

Once configured, you can use natural language in ChatGPT/Claude to interact with the tools:

### Example Queries:

**Finding Recipes:**
```
"Show me traditional USVI recipes"
"Find recipes with fish"
"What Caribbean soups are available?"
```

**Checking Beach Conditions:**
```
"What are the beach conditions at Magens Bay?"
"Show me beaches in St. John"
"Which beaches have low rip current risk?"
```

**Finding Events:**
```
"What music events are happening this month?"
"Find culinary festivals in USVI"
"Show me upcoming events"
```

**Booking Services:**
```
"Book catering for Conch Fritters for 20 guests on April 15th"
"Request a ride to the Carnival Parade for 4 passengers"
```

## 📊 Sample Data

The server includes sample data for:
- 4 authentic USVI recipes
- 4 popular beaches across the three main islands
- 4 upcoming events (festivals, concerts, regattas, culinary experiences)

## 🎨 Inline Cards & Carousels

The server returns rich, formatted responses that display as inline cards in ChatGPT with:

- **Recipe Cards**: Cuisine type, ingredients, pricing, restaurant info, and action buttons
- **Beach Cards**: Conditions, risk levels (color-coded), amenities, and coordinates
- **Event Cards**: Type, date/time, location, pricing, capacity, and action buttons

Action buttons provide quick access to booking, navigation, and contact features.

## 🔧 Development

**Run the server directly:**
```bash
python src/server.py
```

**Test with MCP Inspector:**
```bash
npm install -g @modelcontextprotocol/inspector
mcp-inspector python src/server.py
```

## 📝 License

MIT

## 🌊 About USVI

The US Virgin Islands consist of three main islands:
- **St. Thomas** - Known for shopping, Magens Bay, and cruise ships
- **St. John** - 60% National Park with pristine beaches like Trunk Bay
- **St. Croix** - Largest island with rich history and diverse culture

Experience the warmth, flavor, and beauty of the Caribbean! 🏝️

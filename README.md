# Story Dice 🎲

A web app that picks a random set of UTF-8 emojis (non-repeating) for creative storytelling!

## Features

- 🎨 Random emoji generation with no repetition
- 🔢 Configurable emoji count (default: 9)
- 🎯 Large collection of diverse UTF-8 emojis organized into themed sets
- 🎭 **Fine-grained set control**: Select specific emoji categories
  - 🌍 Environment (landscapes, nature, celestial bodies)
  - 🦁 Character (animals and creatures)
  - 👑 Item (objects, clothing, food)
  - 🎉 Event (celebrations and activities)
  - 🚀 Transport (vehicles)
  - ✨ All Sets (choose from all categories)
- 📱 Responsive design for all devices
- ✨ Beautiful animations and hover effects

## Usage

Simply open `index.html` in your web browser to start using the app.

1. **Select emoji sets**: Choose "All Sets" or pick specific categories (Environment, Character, Item, Event, Transport)
   - You can select multiple specific sets for fine-grained control
   - "All Sets" mode draws from all available categories
2. Choose the number of emojis you want (1-50)
3. Click "Generate Emojis" or press Enter
4. Use the random emojis for storytelling, brainstorming, or creative writing!

### Examples

- **All Sets**: Get a random mix from all emoji categories
- **Environment only**: Perfect for setting scenes (🌍, 🏰, ⭐, 🌺)
- **Character + Item**: Create character-focused stories with props
- **Custom mix**: Combine any sets for your specific storytelling needs

## How to Run

No build process required! Just open the `index.html` file in any modern web browser:

```bash
# Open directly in browser
open index.html

# Or serve with a local server (optional)
python -m http.server 8000
# Then visit http://localhost:8000
```

## Files

- `index.html` - Main HTML structure
- `style.css` - Styling and animations
- `app.js` - JavaScript logic for emoji generation
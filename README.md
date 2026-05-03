# 🗺️ The Razor's Edge Literary Map

Interactive Leaflet.js map tracing Larry Darrell's spiritual journey from W. Somerset Maugham's novel *The Razor's Edge* (1944). Follow Larry from post-WWI Paris through the Mediterranean and across the Indian subcontinent to his enlightenment at Suez.

**[Open the map →](index.html)** — open in any browser, no server needed.

---

## Features

- **18 waypoints** across Europe, Middle East, and India
- **3 switchable map layers:** National Geographic, Ocean, OpenStreetMap
- **Click navigation** — click character names or years to fly to locations
- **Bilingual labels** (English + Chinese) for all cities
- **Walter Landor's poem** — the epigraph from Chapter 5
- **Sophie's story** — the childhood friend who disappears at sea
- **Dark maritime theme** — gold accents on deep navy

---

## Quick Start

```bash
git clone https://github.com/mariusiaowego-commits/razors-edge-map.git
cd razors-edge-map
open index.html
```

---

## Project Structure

```
razors-edge-map/
├── index.html         # Complete map application (all JS/CSS inline)
├── SPEC.md            # Architecture specification
├── STATUS.md          # Current development status
├── DEVELOPMENT_PLAN.md # Development roadmap
├── README.md          # This file
├── docs/              # Documentation
└── vibe coding log.md # Development log
```

---

## How It Works

- **No build step** — single self-contained `index.html`
- **Leaflet.js 1.9.4** loaded via CDN (unpkg)
- **Tile layers** from Esri and OpenStreetMap
- **All waypoint data** lives in a JavaScript `waypoints` array at the bottom of the file

---

## Development

```bash
# Work in a feature branch
git checkout -b feat/my-feature

# Test locally — open in browser
open index.html

# Commit with conventional message
git commit -m "feat: my feature"

# Push and open a PR
git push -u origin feat/my-feature
```

---

## Credits

- Map built with [Leaflet.js](https://leafletjs.com/)
- Tiles by [Esri](https://www.esri.com/) and [OpenStreetMap](https://www.openstreetmap.org/)
- Novel: *The Razor's Edge* by [W. Somerset Maugham](https://en.wikipedia.org/wiki/W._Somerset_Maugham) (1944)
- Poem: "Dying Speech of an Old Philosopher" by [Walter Savage Landor](https://en.wikipedia.org/wiki/Walter_Savage_Landor)

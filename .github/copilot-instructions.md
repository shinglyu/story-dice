# Copilot Instructions

## Service Worker Cache Versioning

Whenever `sw.js` is modified, always increment the `CACHE_NAME` version string (e.g. `story-dice-v2` → `story-dice-v3`). This ensures that browsers detect the updated service worker, discard the stale cache, and serve the latest assets to all users.

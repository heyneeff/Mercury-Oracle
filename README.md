# Oracle Card App

A plug-and-play oracle card web app. No build step. No coding required to customize.

## Folder structure

```
your-oracle/
├── index.html         ← the app (don't touch)
├── deck.config.json   ← YOUR file — edit this
├── card-back.png      ← YOUR card back image
└── cards/
    ├── 01.jpg         ← YOUR card images
    ├── 02.jpg
    └── ...
```

## To make it yours

**1. Replace the card back**
Drop your card back image in the root folder and name it `card-back.png` (or update the path in `deck.config.json`).

**2. Add your card images**
Put all card face images in the `/cards/` folder.

**3. Edit `deck.config.json`**

```json
{
  "name": "Your Deck Name",
  "cardBack": "./card-back.png",
  "cardShape": "tarot",
  "cardWidth": 260,
  "cardHeight": 450,
  "cardRadius": 16,
  "cards": [
    { "id": "01", "title": "Card Name", "image": "./cards/01.jpg" },
    { "id": "02", "title": "Card Name", "image": "./cards/02.jpg" }
  ]
}
```

**Card shape options:**

- `"tarot"` — standard tall rectangle
- `"square"` — set equal width and height
- `"round"` — circular (set equal width and height)
- Any size: adjust `cardWidth` and `cardHeight` freely

**4. Deploy for free**

- Fork this repo on GitHub
- Connect to [Vercel](https://vercel.com) — no build command needed
- Live in 60 seconds

## Hosted by the Mercury Oracle

Created by [Lewis / LensForge](https://github.com/your-handle).

# Retro Cyber Terminal

A retro-cyber styled single-page app with neon aesthetics, CRT/scanline vibes, a Canvas-based Matrix code rain, and a fake terminal that reveals a geolocation-derived secret key.

## Run locally

- Install: `npm install`
- Dev: `npm run dev`
- Build: `npm run build`
- Preview build: `npm run preview`

Notes: geolocation requires a secure context; localhost is secure; `file://` is not.

## Keys overview

- There are two keys to win.
- Key 1 is hidden in source.
- Key 2 is produced by the fake terminal using geolocation in the format `LAT[latInt]_LON[lonInt]`.

## Finding the keys

### Key 1
- Open the ASCII art component source and read the top comment.
- File: [src/components/AsciiArt.jsx](src/components/AsciiArt.jsx)
- The comment contains a line like `KEY1=R3TR0-CYB3R-531`.

### Key 2
- In the homepage terminal, type: `help` to see commands, then run: `getkey`.
- When prompted, allow location access in the browser.
- The app truncates decimals and prints: `LAT[latInt]_LON[lonInt]`.

## Structure

- Pages:
  - [src/pages/Home.jsx](src/pages/Home.jsx) — composition of MatrixCanvas, AsciiArt, TypingIntro, and FakeTerminal.
  - [src/pages/NotFound.jsx](src/pages/NotFound.jsx) — glitchy 404 with ASCII and a link home.
- Components:
  - [src/components/MatrixCanvas.jsx](src/components/MatrixCanvas.jsx) — Canvas code rain background.
  - [src/components/AsciiArt.jsx](src/components/AsciiArt.jsx) — neon ASCII banner (source hides Key 1).
  - [src/components/TypingIntro.jsx](src/components/TypingIntro.jsx) — terminal-style typewriter intro lines.
  - [src/components/FakeTerminal.jsx](src/components/FakeTerminal.jsx) — accepts `help`, `clear`, `getkey`.
- App shell:
  - [src/main.jsx](src/main.jsx) — React Router routes for `/` and `*`.
  - [index.html](index.html) — VT323 font, meta theme color, and subtle hint comments.
  - [src/index.css](src/index.css) — Tailwind directives plus CRT flicker, scanlines, neon helpers.
  - [tailwind.config.js](tailwind.config.js) — neon palette and glow/drop-shadow tokens.

## Styling and theme

- Tailwind is configured with an extended neon palette:
  - surface.base `#0A0F14`, surface.panel `#0F1720`, surface.sunken `#070B10`
  - text.primary `#E6F1FF`, text.muted `#A3B1C2`
  - neon.green `#39FF14`, neon.pink `#FF2AD1`, neon.blue `#00E5FF`
- Glow utilities:
  - `shadow-neon-green`, `shadow-neon-pink`, `shadow-neon-blue`
  - `drop-shadow-neonGreen`, `drop-shadow-neonPink`, `drop-shadow-neonBlue`
- CRT/Scanlines:
  - Apply class `crt` to any container for a subtle flicker.
  - The fixed `.scanlines` overlay is rendered on the homepage.

## Accessibility and performance

- `prefers-reduced-motion` is respected in the typewriter effect to avoid animation when users prefer less motion.
- Keyboard focus ring: `.neon-focus` ensures visible focus for interactive elements.
- The Matrix canvas is throttled to ~30 FPS and scales to device pixel ratio to remain performant.

## Hints and hidden clues

- [index.html](index.html) contains subtle HTML comments near the title.
- 404 page: [src/pages/NotFound.jsx](src/pages/NotFound.jsx) carries thematic hints.
- Hover effects with slight glitch may reveal hints via glow/contrast shifts.

## Command reference (terminal)

- `help`: Show available commands.
- `clear`: Clear the terminal output.
- `getkey`: Request geolocation and print Key 2 as `LAT[latInt]_LON[lonInt]`.

## Troubleshooting geolocation

- If you deny permission, the terminal prints a helpful message; re-run `getkey` and allow it.
- If running over http on a remote device, most browsers require https. For local development, use `http://localhost` which is treated as secure.

## Customizing the neon look

- Update palette and shadows in: [tailwind.config.js](tailwind.config.js)
- Extend or tweak CRT/glitch helpers in: [src/index.css](src/index.css)
- Change ASCII art or embed different source hints in: [src/components/AsciiArt.jsx](src/components/AsciiArt.jsx)

## Deployment

- Build the site: `npm run build`
- Preview locally: `npm run preview`
- Deploy the `dist/` folder to any static host (Netlify, Vercel, GitHub Pages, etc.).

## Privacy note

- Geolocation is fetched only on explicit `getkey` command and never leaves the browser. No network calls are made by this feature.

## License

- This project is provided for demo and educational purposes.

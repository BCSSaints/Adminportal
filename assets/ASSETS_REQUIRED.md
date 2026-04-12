# Generating App Assets

All app icons and splash screens are generated automatically from the two
Byne Church logo files. Run one command and you're done.

## Step 1 — Save the logo files

Create the folder `assets/logos/` and save:

| File | What it is |
|---|---|
| `assets/logos/logo-color.png` | Blue logo on **transparent** background (exported from design tool) |
| `assets/logos/logo-white.png` | White logo on **transparent** background |

> **Tip:** Export from Figma/Illustrator/Photoshop with "transparent background" checked.
> The script adds the coloured backgrounds automatically.

## Step 2 — Install dependencies and run

```bash
npm install
npm run assets
```

## What gets generated

| File | Size | Used for |
|---|---|---|
| `assets/icon.png` | 1024×1024 | iOS App Store icon |
| `assets/adaptive-icon.png` | 1024×1024 | Android home screen icon |
| `assets/splash.png` | 1284×2778 | Launch / splash screen |
| `assets/favicon.png` | 48×48 | Web favicon |

### Visual layout

| Asset | Background | Logo |
|---|---|---|
| `icon.png` | Brand blue `#5BB8D4` | White logo, 55% canvas width |
| `adaptive-icon.png` | Brand blue `#5BB8D4` | White logo, fits Android safe zone |
| `splash.png` | White `#ffffff` | Blue logo, 800 px wide, centred |
| `favicon.png` | Brand blue `#5BB8D4` | White logo |

## Regenerating after a logo update

Just re-save the file(s) to `assets/logos/` and run `npm run assets` again.

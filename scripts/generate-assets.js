/**
 * generate-assets.js
 *
 * Generates all required Expo image assets from the Byne Church logos.
 *
 * BEFORE RUNNING:
 *   1. Save the blue-on-white logo as:  assets/logos/logo-color.png
 *   2. Save the white logo as:          assets/logos/logo-white.png
 *   3. Run: npm run assets
 *
 * OUTPUTS:
 *   assets/icon.png           1024×1024  — App Store / home screen icon
 *   assets/adaptive-icon.png  1024×1024  — Android adaptive icon foreground
 *   assets/splash.png         1284×2778  — Splash screen
 *   assets/favicon.png          48×48   — Web favicon
 */

const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

// ── Brand colours ──────────────────────────────────────────────────────────────
const BRAND_BLUE   = { r: 91,  g: 184, b: 212, alpha: 1 }; // #5BB8D4
const WHITE        = { r: 255, g: 255, b: 255, alpha: 1 };

// ── Source logos ───────────────────────────────────────────────────────────────
const LOGO_WHITE = path.join(__dirname, '../assets/logos/logo-white.png');
const LOGO_COLOR = path.join(__dirname, '../assets/logos/logo-color.png');

// ── Output paths ───────────────────────────────────────────────────────────────
const OUT_ICON          = path.join(__dirname, '../assets/icon.png');
const OUT_ADAPTIVE      = path.join(__dirname, '../assets/adaptive-icon.png');
const OUT_SPLASH        = path.join(__dirname, '../assets/splash.png');
const OUT_FAVICON       = path.join(__dirname, '../assets/favicon.png');

// ── Helpers ────────────────────────────────────────────────────────────────────

/** Solid colour background as a raw PNG buffer */
function solidBackground(width, height, { r, g, b, alpha }) {
  return sharp({
    create: { width, height, channels: 4, background: { r, g, b, alpha } },
  }).png();
}

/**
 * Resize a logo so its LONGEST side equals `maxSide`, then return the buffer.
 * The result keeps the original transparent background.
 */
async function resizeLogo(logoPath, maxSide) {
  const meta = await sharp(logoPath).metadata();
  const isWide = meta.width >= meta.height;
  return sharp(logoPath)
    .resize(
      isWide ? maxSide : null,
      isWide ? null    : maxSide,
      { fit: 'inside', withoutEnlargement: false }
    )
    .png()
    .toBuffer();
}

/**
 * Place `overlayBuffer` centred on a `bgWidth × bgHeight` background of `bgColor`,
 * then write to `outPath`.
 */
async function composeOnBackground(bgWidth, bgHeight, bgColor, overlayBuffer, outPath) {
  const bgBuffer = await solidBackground(bgWidth, bgHeight, bgColor).toBuffer();

  const overlayMeta = await sharp(overlayBuffer).metadata();
  const left = Math.round((bgWidth  - overlayMeta.width)  / 2);
  const top  = Math.round((bgHeight - overlayMeta.height) / 2);

  await sharp(bgBuffer)
    .composite([{ input: overlayBuffer, left, top }])
    .png()
    .toFile(outPath);
}

// ── Asset generators ───────────────────────────────────────────────────────────

async function makeIcon() {
  // 1024×1024, white logo centred on brand blue
  // Logo fills ~55% of the canvas (≈563 px) — standard app icon safe zone
  const logo = await resizeLogo(LOGO_WHITE, 563);
  await composeOnBackground(1024, 1024, BRAND_BLUE, logo, OUT_ICON);
  console.log('✓  icon.png          (1024×1024, white logo on brand blue)');
}

async function makeAdaptiveIcon() {
  // Same as icon but the safe zone for adaptive icons is the inner 66% (≈676 px).
  // We keep the logo at 500 px so it's comfortably inside the safe circle/square.
  const logo = await resizeLogo(LOGO_WHITE, 500);
  await composeOnBackground(1024, 1024, BRAND_BLUE, logo, OUT_ADAPTIVE);
  console.log('✓  adaptive-icon.png (1024×1024, white logo on brand blue)');
}

async function makeSplash() {
  // 1284×2778 (iPhone 14 Pro Max).
  // Blue logo centred, fills ~800 px wide on a white background.
  const logo = await resizeLogo(LOGO_COLOR, 800);
  await composeOnBackground(1284, 2778, WHITE, logo, OUT_SPLASH);
  console.log('✓  splash.png        (1284×2778, blue logo on white)');
}

async function makeFavicon() {
  // 48×48 favicon — white logo on brand blue, tiny so keep logo large (36 px)
  const logo = await resizeLogo(LOGO_WHITE, 36);
  await composeOnBackground(48, 48, BRAND_BLUE, logo, OUT_FAVICON);
  console.log('✓  favicon.png       (48×48,   white logo on brand blue)');
}

// ── Main ───────────────────────────────────────────────────────────────────────

async function main() {
  // Validate source files exist
  const missing = [LOGO_WHITE, LOGO_COLOR].filter((f) => !fs.existsSync(f));
  if (missing.length) {
    console.error('\n  Missing logo files:');
    missing.forEach((f) => console.error(`    ${path.relative(process.cwd(), f)}`));
    console.error('\n  Save the logos there and re-run: npm run assets\n');
    process.exit(1);
  }

  // Ensure output directory exists
  fs.mkdirSync(path.join(__dirname, '../assets'), { recursive: true });

  console.log('\nGenerating Expo assets for Byne Church…\n');

  await Promise.all([makeIcon(), makeAdaptiveIcon(), makeSplash(), makeFavicon()]);

  console.log('\nAll assets written to assets/  — you\'re ready to build!\n');
}

main().catch((err) => {
  console.error('\nError generating assets:', err.message);
  process.exit(1);
});

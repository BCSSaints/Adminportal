/**
 * generate-assets.js
 *
 * Generates all required Expo image assets for Byne Church.
 * The logos are embedded as SVG — no external files needed.
 *
 * Run: npm run assets
 *
 * OUTPUTS:
 *   assets/icon.png           1024×1024  — App Store / home screen icon
 *   assets/adaptive-icon.png  1024×1024  — Android adaptive icon foreground
 *   assets/splash.png         1284×2778  — Splash / launch screen
 *   assets/favicon.png          48×48   — Web favicon
 */

const sharp = require('sharp');
const path  = require('path');
const fs    = require('fs');

// ── Brand colour ───────────────────────────────────────────────────────────────
const BLUE  = '#5BB8D4';
const WHITE = '#FFFFFF';

// ── SVG logo definitions ───────────────────────────────────────────────────────
//
// "BYNE"   — ultra-thin letterforms, generous tracking
// "CHURCH" — bold, tighter tracking
// Both glyphs match the Byne Church wordmark.

// Wide single-line logo — used for splash screen and favicon
function logoSvgWide(color) {
  const sw = 2.8;
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2400 280">
  <text
    x="1200" y="220"
    text-anchor="middle"
    font-family="Helvetica Neue, Helvetica, Arial, sans-serif"
    font-size="190">
    <tspan font-weight="200" letter-spacing="24"
      fill="none" stroke="${color}" stroke-width="${sw}"
      paint-order="stroke">BYNE</tspan><tspan
      dx="48" font-weight="700" letter-spacing="10"
      fill="${color}">CHURCH</tspan>
  </text>
</svg>`;
}

// Stacked two-line logo — used for app icons so the wordmark fills the square canvas
function logoSvgStacked(color) {
  const sw = 3.5;
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 420">
  <!-- BYNE — thin outline, top line -->
  <text
    x="400" y="175"
    text-anchor="middle"
    font-family="Helvetica Neue, Helvetica, Arial, sans-serif"
    font-size="185"
    font-weight="200"
    letter-spacing="30"
    fill="none"
    stroke="${color}"
    stroke-width="${sw}"
    paint-order="stroke">BYNE</text>
  <!-- CHURCH — bold, bottom line -->
  <text
    x="400" y="370"
    text-anchor="middle"
    font-family="Helvetica Neue, Helvetica, Arial, sans-serif"
    font-size="185"
    font-weight="700"
    letter-spacing="8"
    fill="${color}">CHURCH</text>
</svg>`;
}

// ── Helpers ────────────────────────────────────────────────────────────────────

/** Create a solid-colour PNG buffer at the given size */
async function solidBg(width, height, hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return sharp({
    create: { width, height, channels: 4, background: { r, g, b, alpha: 1 } },
  }).png().toBuffer();
}

/**
 * Rasterise an SVG string to a PNG buffer scaled so the
 * longest side equals `maxSide`.  Transparent padding is trimmed first
 * so the text fills the target size rather than the empty SVG canvas.
 */
async function svgToPng(svgString, maxSide) {
  const buf = Buffer.from(svgString);
  // Trim transparent/white edges so we're sizing the actual text, not the canvas
  const trimmed = await sharp(buf).trim({ threshold: 10 }).png().toBuffer();
  const meta = await sharp(trimmed).metadata();
  const isWide = meta.width >= meta.height;
  return sharp(trimmed)
    .resize(
      isWide ? maxSide : null,
      isWide ? null    : maxSide,
      { fit: 'inside' }
    )
    .png()
    .toBuffer();
}

/**
 * Composite `overlayBuf` centred on a `bgW × bgH` solid-colour background
 * and write the result to `outPath`.
 */
async function compose(bgW, bgH, bgHex, overlayBuf, outPath) {
  const bg  = await solidBg(bgW, bgH, bgHex);
  const meta = await sharp(overlayBuf).metadata();
  const left = Math.round((bgW - meta.width)  / 2);
  const top  = Math.round((bgH - meta.height) / 2);

  await sharp(bg)
    .composite([{ input: overlayBuf, left, top }])
    .png()
    .toFile(outPath);
}

// ── Asset generators ───────────────────────────────────────────────────────────

async function makeIcon(outPath) {
  // Stacked layout fills the square canvas — logo width 820 px on 1024 canvas
  const logo = await svgToPng(logoSvgStacked(WHITE), 820);
  await compose(1024, 1024, BLUE, logo, outPath);
  console.log(`✓  ${path.basename(outPath).padEnd(22)} 1024×1024  stacked white logo on brand blue`);
}

async function makeAdaptiveIcon(outPath) {
  // Android safe zone is inner 66% — keep stacked logo at 680 px
  const logo = await svgToPng(logoSvgStacked(WHITE), 680);
  await compose(1024, 1024, BLUE, logo, outPath);
  console.log(`✓  ${path.basename(outPath).padEnd(22)} 1024×1024  stacked white logo on brand blue (Android)`);
}

async function makeSplash(outPath) {
  const bgW = 1284, bgH = 2778;

  // Use stacked (two-line) layout — much better aspect ratio for a tall canvas
  // Target 55 % of canvas width; the 800×420 viewBox gives ~290 px height at this size
  const targetW = Math.round(bgW * 0.55);
  const logo    = await svgToPng(logoSvgStacked(BLUE), targetW);
  const meta    = await sharp(logo).metadata();

  const bg   = await solidBg(bgW, bgH, WHITE);
  const left = Math.round((bgW - meta.width)  / 2);
  // 45 % down — slightly above true centre, standard splash convention
  const top  = Math.round((bgH - meta.height) * 0.45);

  await sharp(bg)
    .composite([{ input: logo, left, top }])
    .png()
    .toFile(outPath);
  console.log(`✓  ${path.basename(outPath).padEnd(22)} 1284×2778  ${meta.width}×${meta.height}px logo centred at ${left},${top}`);
}

async function makeFavicon(outPath) {
  const logo = await svgToPng(logoSvgWide(WHITE), 36);
  await compose(48, 48, BLUE, logo, outPath);
  console.log(`✓  ${path.basename(outPath).padEnd(22)} 48×48      white logo on brand blue`);
}

// ── Main ───────────────────────────────────────────────────────────────────────

async function main() {
  const assetsDir = path.join(__dirname, '../assets');
  fs.mkdirSync(assetsDir, { recursive: true });

  console.log('\nGenerating Expo assets for Byne Church…\n');

  await Promise.all([
    makeIcon(        path.join(assetsDir, 'icon.png')),
    makeAdaptiveIcon(path.join(assetsDir, 'adaptive-icon.png')),
    makeSplash(      path.join(assetsDir, 'splash.png')),
    makeFavicon(     path.join(assetsDir, 'favicon.png')),
  ]);

  console.log('\nAll assets written to assets/ — ready to build!\n');
}

main().catch((err) => {
  console.error('\nError:', err.message);
  process.exit(1);
});

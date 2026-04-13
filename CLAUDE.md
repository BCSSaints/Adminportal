# CLAUDE.md — Adminportal

> Guidelines and context for AI assistants working in this repository.

## Project Overview

**Adminportal** is a React Native (Expo) mobile app for **Byne Church (BCC Saints)** that embeds the Planning Center Church Center web app inside a branded native shell. Congregation members get a Byne-branded app with all Church Center features (giving, events, check-in, profile) without needing to download the separate "Church Center" app.

- **Repository**: BCSSaints/Adminportal
- **Tech Stack**: Expo SDK 51 (React Native), react-native-webview, React Navigation (bottom tabs)
- **Platform**: iOS and Android
- **Church Center URL**: `https://byne.churchcenter.com`
- **Status**: Core implementation complete — ready for local testing via Expo Go and App Store build

## What Has Been Built

### Core App
- **WebView shell** wrapping `byne.churchcenter.com` — all Church Center web features work inside the app
- **Bottom tab navigation** — Home, Give, Check In, Events, Me — each loads the corresponding Church Center URL path
- **Shared cookies** across all tabs so users stay logged in when switching tabs
- **Pull-to-refresh** on every screen

### Kids Check-In
- Check In tab loads `/check-ins` in the WebView — congregation self-check-in works in-app
- **Camera permissions** configured for QR code scanning:
  - iOS: `NSCameraUsageDescription` in `app.json` + `mediaCapturePermissionGrantType="grant"` on WebView
  - Android: `CAMERA` permission + `onPermissionRequest` handler in WebView

### App Store Redirect Blocking
- `onShouldStartLoadWithRequest` intercepts and blocks `itms-apps://`, `market://`, `intent://` schemes so Planning Center's "download our app" banners don't bounce users out

### Branding
- Brand color: `#5BB8D4` (blue)
- White header with blue text/icons
- All brand settings in one file: `src/config.js`

### Generated Assets
All four required Expo assets are generated from an SVG wordmark baked into `scripts/generate-assets.js` — no external logo files needed:

| File | Size | Description |
|---|---|---|
| `assets/icon.png` | 1024×1024 | White stacked "BYNE / CHURCH" on blue — App Store icon |
| `assets/adaptive-icon.png` | 1024×1024 | Same, sized for Android safe zone |
| `assets/splash.png` | 1284×2778 | Blue stacked logo on white — launch screen |
| `assets/favicon.png` | 48×48 | White wide logo on blue — web favicon |

Regenerate with: `npm run assets`

## Repository Structure

```
Adminportal/
├── App.js                          # Root: splash screen + dark status bar
├── app.json                        # Expo config: name, bundle IDs, permissions, assets
├── babel.config.js                 # Babel config for Expo
├── eas.json                        # EAS Build config (app store submissions)
├── package.json                    # Dependencies (sharp as devDep for asset generation)
├── byne-preview.html               # Self-contained asset preview (open in browser)
├── CLAUDE.md                       # This file
├── assets/
│   ├── icon.png                    # 1024×1024 — generated
│   ├── adaptive-icon.png           # 1024×1024 — generated
│   ├── splash.png                  # 1284×2778 — generated
│   └── favicon.png                 # 48×48 — generated
├── scripts/
│   └── generate-assets.js          # Asset generator (Sharp + embedded SVG)
└── src/
    ├── config.js                   # ⭐ MAIN CONFIG — subdomain, colors, tabs
    ├── navigation/
    │   └── AppNavigator.js         # Bottom tab navigator (reads from config)
    └── screens/
        └── ChurchCenterScreen.js   # WebView screen (camera, URL filtering, cookies)
```

## Key Configuration (`src/config.js`)

This is the only file that needs to change to rebrand for a different church:

| Variable | Current Value | Description |
|---|---|---|
| `CHURCH_CENTER_SUBDOMAIN` | `byne` | Church Center subdomain |
| `CHURCH_NAME` | `Byne` | Shown in app header on Home tab |
| `COLORS.primary` | `#5BB8D4` | Brand blue |
| `TABS` | Home/Give/Check In/Events/Me | Bottom tab definitions |

## Local Development

### Prerequisites
- Node.js 18+
- Expo Go app on your phone (iOS App Store / Google Play)

### Quick Start
```bash
git clone https://github.com/BCSSaints/Adminportal.git
cd Adminportal
npm install
npm start
```
Scan the QR code with Expo Go on your phone (must be on same WiFi).

### Regenerate Assets
```bash
npm run assets
```

### Building for App Stores
```bash
npm install -g eas-cli
eas login
npm run build:ios      # Requires Apple Developer account ($99/yr)
npm run build:android  # Requires Google Play account ($25 one-time)
```

## What Still Needs Doing

1. **Test on a real device** — run `npm start`, scan with Expo Go, verify all 5 tabs load correctly and login persists across tabs
2. **App Store submission** — set up EAS account, configure signing, submit via `eas build` + `eas submit`
3. **App Store metadata** — screenshots, description, keywords for App Store / Play Store listings
4. **Push notifications** (optional) — Planning Center supports push via their native app; the WebView approach won't receive native push unless added separately
5. **Deep links** (optional) — if you want `byne.churchcenter.com` links to open the app instead of the browser

## Development Workflow

### Branch Conventions
- Feature branches: `feature/<description>`
- Bug fixes: `bugfix/<description>`
- AI-generated branches: `claude/<description>-<session-id>`

### Commit Messages
- Imperative mood: "Add", "Fix", "Update", "Remove"
- Under 72 characters

## AI Assistant Guidelines

- **Read before writing**: Always read existing files before modifying them
- **Minimal changes**: Only change what's necessary to complete the task
- **No over-engineering**: Avoid abstractions or features not requested
- **Preserve style**: Match existing code style and conventions
- **Update this file**: Keep CLAUDE.md current when adding new patterns or completing tasks

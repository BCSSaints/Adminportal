# CLAUDE.md — Adminportal

> Guidelines and context for AI assistants working in this repository.

## Project Overview

**Adminportal** is a React Native (Expo) mobile app for BCC Saints that embeds the Planning Center Church Center web app. It gives congregation members a church-branded app experience while using Church Center's full feature set under the hood.

- **Repository**: BCSSaints/Adminportal
- **Tech Stack**: Expo (React Native), react-native-webview, React Navigation
- **Platform**: iOS and Android
- **Status**: Initial implementation complete

## Repository Structure

```
Adminportal/
├── App.js                          # Root component, splash screen handling
├── app.json                        # Expo app configuration (name, bundle ID, icons)
├── babel.config.js                 # Babel config for Expo
├── eas.json                        # EAS Build configuration (app store submissions)
├── package.json                    # Dependencies
├── CLAUDE.md                       # AI assistant guidelines (this file)
├── assets/                         # App icons and splash screen images (add your own)
│   ├── icon.png                    # 1024x1024 app icon (REQUIRED — add yours)
│   ├── splash.png                  # Splash screen image (REQUIRED — add yours)
│   ├── adaptive-icon.png           # Android adaptive icon foreground
│   └── favicon.png                 # Web favicon
└── src/
    ├── config.js                   # ⭐ MAIN CONFIG — set subdomain & colors here
    ├── navigation/
    │   └── AppNavigator.js         # Bottom tab navigation setup
    └── screens/
        └── ChurchCenterScreen.js   # WebView screen loading Church Center
```

> **Note**: This file should be updated as the project grows.

## Development Workflow

### Branch Conventions

- Feature branches: `feature/<description>`
- Bug fixes: `bugfix/<description>`
- AI-generated branches: `claude/<description>-<session-id>`

### Commit Messages

- Use clear, descriptive commit messages
- Start with a verb in imperative mood (e.g., "Add", "Fix", "Update", "Remove")
- Keep the subject line under 72 characters

### Pull Requests

- PRs should target the main/default branch unless otherwise specified
- Include a summary of changes and any testing performed

## Code Conventions

> To be updated as the tech stack and coding patterns are established.

### General Principles

- Keep code simple and readable
- Follow the principle of least surprise
- Prefer explicit over implicit
- Write self-documenting code; add comments only where intent isn't obvious

## Testing

> To be updated once a test framework is chosen and configured.

- Run all tests before submitting changes
- Add tests for new functionality
- Do not reduce existing test coverage

## Environment Setup

### Prerequisites
- Node.js 18+
- Expo CLI: `npm install -g expo-cli`
- EAS CLI (for builds): `npm install -g eas-cli`
- Expo Go app on your phone (for development testing)

### Quick Start

1. Clone the repository
2. `npm install`
3. Edit `src/config.js` — set `CHURCH_CENTER_SUBDOMAIN` to your church's subdomain
4. Add your church's `icon.png` (1024×1024) and `splash.png` to `assets/`
5. `npm start` — scan the QR code with Expo Go

### Building for App Stores

```bash
# Log in to Expo
eas login

# Build for iOS (requires Apple Developer account)
npm run build:ios

# Build for Android (requires Google Play account)
npm run build:android
```

### Key Configuration (`src/config.js`)

| Variable | Description |
|---|---|
| `CHURCH_CENTER_SUBDOMAIN` | Your church's subdomain (e.g. `bccsaints`) |
| `CHURCH_NAME` | Displayed in the app header |
| `COLORS` | Brand color palette |
| `TABS` | Bottom tab labels, icons, and Church Center URL paths |

## Key Files to Update

When making changes, remember to update:

- This `CLAUDE.md` file when adding new patterns, tools, or conventions
- `README.md` (when created) for user-facing documentation
- Any relevant config files when adding dependencies or tooling

## AI Assistant Guidelines

- **Read before writing**: Always read existing files before modifying them
- **Minimal changes**: Only change what's necessary to complete the task
- **No over-engineering**: Avoid adding abstractions or features not requested
- **Preserve style**: Match existing code style and conventions in the project
- **Test your changes**: Run available tests/linters before committing
- **Update docs**: Keep this file and other documentation current

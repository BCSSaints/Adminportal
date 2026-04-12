# Assets Required

Add the following image files to this directory before building the app:

| File | Size | Description |
|---|---|---|
| `icon.png` | 1024×1024 px | App icon (shown on home screen) |
| `splash.png` | 1284×2778 px | Splash/loading screen image |
| `adaptive-icon.png` | 1024×1024 px | Android adaptive icon foreground |
| `favicon.png` | 48×48 px | Web favicon |

**Tips:**
- Use your church logo on a solid background matching `COLORS.primary` in `src/config.js`
- Expo's [Image Asset Generator](https://www.npmjs.com/package/sharp) can resize a single logo into all required sizes
- The background color for splash and adaptive icon is set in `app.json` under `splash.backgroundColor`

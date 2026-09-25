# The AI Core

A polished Arabic AI assistant app named "أوجن | الجوهرة الذكية" designed as a mobile-friendly PWA and Android-ready foundation.

## Features
- Arabic conversational UI
- Gemini API integration
- Voice input support
- Local task storage
- Local memory panel
- PWA manifest and offline cache
- Android build automation via GitHub Actions

## Run locally

1. Open the folder in a browser and serve the project:

```bash
python3 -m http.server 8000
```

2. Open the app in the browser:

```bash
http://localhost:8000/
```

## Android build path

The repository includes a GitHub Actions workflow that:
- copies the web app to `www/`
- installs Capacitor dependencies
- initializes Android
- builds the APK with Gradle

Command flow is defined in `.github/workflows/build-apk.yml`.

## Required API key

Use the settings button inside the app and paste your Gemini API key.

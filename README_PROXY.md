### Proxy deployment

A simple Express proxy is included at `server.js`. It forwards requests to the Google Generative Language API using the `GEMINI_API_KEY` environment variable. This keeps your API key off the client and out of APKs.

To run locally:

```bash
cp .env.example .env
# Edit .env and set GEMINI_API_KEY
npm install
npm run start
```

To deploy publicly (Vercel/Heroku):
- Set environment variable `GEMINI_API_KEY` in the hosting provider dashboard.
- Deploy the repository; the endpoint will be available at `https://<your-host>/api/generate`.

Client configuration
- In the app, open settings and set the "Proxy URL" to your deployed proxy root (e.g. `https://my-ojin-proxy.example.com`). The app will then send generation requests to `POST ${proxy}/api/generate`.

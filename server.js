// Simple Express proxy for Gemini API
// Expects GEMINI_API_KEY in environment variables.

const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;
const API_KEY = process.env.GEMINI_API_KEY;

if (!API_KEY) {
  console.warn('Warning: GEMINI_API_KEY is not set. The proxy will return 500 for requests.');
}

app.use(cors());
app.use(express.json({ limit: '1mb' }));

app.post('/api/generate', async (req, res) => {
  if (!API_KEY) return res.status(500).json({ error: 'Server misconfigured: GEMINI_API_KEY missing' });

  // Accept payload either as { prompt: 'text' } or full GL payload
  const body = req.body || {};
  let glPayload;

  if (body.prompt) {
    // Convert simple prompt to generativelanguage payload
    glPayload = {
      systemInstruction: { parts: [{ text: body.system || "" }] },
      contents: [{ role: 'user', parts: [{ text: body.prompt }] }]
    };
  } else if (body.contents) {
    glPayload = body;
  } else {
    return res.status(400).json({ error: 'Invalid request payload. Use { prompt: string } or a full GL payload.' });
  }

  try {
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;
    const r = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(glPayload)
    });

    const data = await r.json();
    return res.status(r.status).json(data);
  } catch (err) {
    console.error('Proxy error:', err);
    return res.status(502).json({ error: 'Upstream request failed' });
  }
});

app.get('/health', (req, res) => res.json({ ok: true }));

app.listen(port, () => {
  console.log(`Ojin proxy listening on port ${port}`);
});

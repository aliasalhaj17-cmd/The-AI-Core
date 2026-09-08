```javascript
const CACHE_NAME = 'ojen-core-v1';
const assets = [
  '/The-AI-Core/',
  '/The-AI-Core/index.html',
  '/The-AI-Core/manifest.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(assets);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
```؟

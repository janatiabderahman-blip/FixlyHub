const CACHE_NAME = 'fixlyhub-v1';
const STATIC_ASSETS = [
  './',
  './index.html',
  './calc.html',
  './manifest.json'
];

// Install: cache core assets only (no ad scripts, no external domains)
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS))
  );
});

// Activate: clean old caches if needed
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  );
});

// Fetch: cache-first for same-origin HTML, network-first for others
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Do not interfere with third-party scripts (ads, CPA, CDNs)
  if (url.origin !== self.location.origin) {
    return; // let the network handle it
  }

  // For HTML pages: network-first with fallback to cache
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(() => caches.match(event.request))
    );
    return;
  }

  // For static same-origin assets: cache-first
  event.respondWith(
    caches.match(event.request).then((cached) => {
      return (
        cached ||
        fetch(event.request).then((response) => {
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, response.clone());
            return response;
          });
        })
      );
    })
  );
});

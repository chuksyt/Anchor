/* Anchor service worker.
   The whole app is four static files, so the strategy is simple:
   precache the shell, serve from cache, and refresh it in the
   background. Your streak data never touches this - it lives in
   localStorage, which the service worker cannot see or evict. */

const CACHE = 'anchor-v2';
const SHELL = [
  './',
  './index.html',
  './styles.css',
  './app.js',
  './admin.html',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-512.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE)
      .then((c) => c.addAll(SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

/* Cache-first, then revalidate. Offline is the normal case here, not
   the exception, so a cache hit always wins the race. */
self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;

  e.respondWith(
    caches.match(e.request).then((hit) => {
      const live = fetch(e.request)
        .then((res) => {
          if (res && res.status === 200 && res.type === 'basic') {
            const copy = res.clone();
            caches.open(CACHE).then((c) => c.put(e.request, copy));
          }
          return res;
        })
        .catch(() => hit);          // offline: fall back to whatever we have
      return hit || live;
    })
  );
});

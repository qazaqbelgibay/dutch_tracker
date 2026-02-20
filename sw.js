const CACHE_NAME = 'dutch-tracker-v5';
const BASE = '/dutch_tracker/';
const ASSETS = [BASE, BASE + 'index.html', BASE + 'manifest.json'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('message', e => {
  if (e.data === 'SKIP_WAITING') self.skipWaiting();
});

self.addEventListener('fetch', e => {
  const req = e.request;
  const url = new URL(req.url);
  const isAppHtml = req.mode === 'navigate' || url.pathname === BASE || url.pathname.endsWith('/index.html');

  if (isAppHtml) {
    // Network-first for app shell so updates show up quickly on mobile.
    e.respondWith(
      fetch(req)
        .then(res => {
          const copy = res.clone();
          caches.open(CACHE_NAME).then(c => c.put(BASE + 'index.html', copy));
          return res;
        })
        .catch(() => caches.match(BASE + 'index.html'))
    );
    return;
  }

  // Cache-first for static assets.
  e.respondWith(
    caches.match(req).then(r => r || fetch(req).catch(() => caches.match(BASE + 'index.html')))
  );
});

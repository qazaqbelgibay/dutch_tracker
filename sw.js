const CACHE_NAME = 'tracker-v10';
const BASE = '/dutch_tracker/';
const ASSETS = [
  BASE,
  BASE + 'index.html',
  BASE + 'manifest.json',
  BASE + 'styles.css?v=4',
  BASE + 'i18n.js?v=4',
  BASE + 'app.js?v=4'
];

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
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  const isAppHtml = req.mode === 'navigate' || url.pathname === BASE || url.pathname.endsWith('/index.html');
  const isCoreAsset = url.origin === location.origin &&
    (url.pathname.endsWith('.css') || url.pathname.endsWith('.js') || url.pathname.endsWith('.json'));

  if (isAppHtml || isCoreAsset) {
    // Network-first for the app shell + core assets so updates show up
    // quickly; falls back to cache when offline.
    const cacheKey = isAppHtml ? BASE + 'index.html' : req;
    e.respondWith(
      fetch(req)
        .then(res => {
          if (res.ok) {
            const copy = res.clone();
            caches.open(CACHE_NAME).then(c => c.put(cacheKey, copy));
          }
          return res;
        })
        .catch(() => caches.match(cacheKey))
    );
    return;
  }

  // Cache-first for everything else (fonts etc.). Never fall back to the
  // app shell for non-navigation requests — a failed font/image request
  // must fail cleanly instead of receiving HTML.
  e.respondWith(
    caches.match(req).then(r =>
      r || fetch(req).then(res => {
        if (res.ok && url.origin === location.origin) {
          const copy = res.clone();
          caches.open(CACHE_NAME).then(c => c.put(req, copy));
        }
        return res;
      })
    )
  );
});

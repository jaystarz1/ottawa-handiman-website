// Ottawa Handiman Service Worker
// v4 - network-first for HTML/CSS/JS to avoid stale-asset renders

const CACHE_NAME = 'ottawa-handiman-v4';
const PRECACHE_URLS = [
  '/',
  '/assets/css/style.css',
  '/assets/css/shared-styles.css',
  '/assets/css/projects.css',
  '/assets/js/script.js',
  '/assets/js/shared-scripts.js',
  '/assets/js/projects.js',
  '/assets/js/cookie-consent.js',
  '/assets/images/workshop-hero.webp',
  '/assets/images/workshop-hero.jpg',
  '/favicon.svg',
  '/manifest.json'
];

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(PRECACHE_URLS).catch(() => null))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(names => Promise.all(
      names.filter(n => n !== CACHE_NAME).map(n => caches.delete(n))
    )).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  const isDynamic = /\.(html|css|js)$/.test(url.pathname) || url.pathname === '/' || url.pathname.endsWith('/');

  if (isDynamic) {
    // Network-first: always try to get fresh HTML/CSS/JS, fall back to cache offline
    event.respondWith(
      fetch(req).then(res => {
        if (res && res.status === 200 && res.type === 'basic') {
          const copy = res.clone();
          caches.open(CACHE_NAME).then(c => c.put(req, copy));
        }
        return res;
      }).catch(() => caches.match(req))
    );
  } else {
    // Cache-first for images, fonts, etc.
    event.respondWith(
      caches.match(req).then(cached => cached || fetch(req).then(res => {
        if (res && res.status === 200 && res.type === 'basic') {
          const copy = res.clone();
          caches.open(CACHE_NAME).then(c => c.put(req, copy));
        }
        return res;
      }))
    );
  }
});

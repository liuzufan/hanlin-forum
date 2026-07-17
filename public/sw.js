// 翰林校园论坛 Service Worker v20
const CACHE_NAME = 'hanlin-forum-v20';
const STATIC_ASSETS = [
  '/',
  '/css/style.css?v=20',
  '/js/app.js?v=20',
  '/manifest.json'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(STATIC_ASSETS).catch(function() {});
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(names) {
      return Promise.all(
        names.filter(function(name) { return name !== CACHE_NAME; })
          .map(function(name) { return caches.delete(name); })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', function(event) {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  if (url.pathname.startsWith('/api/')) return;
  if (url.hostname.includes('translate.googleapis.com') || url.hostname.includes('mymemory.translated.net')) return;

  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).then(function(response) {
        if (response && response.status === 200) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(function(cache) {
            cache.put(event.request, clone).catch(function() {});
          });
        }
        return response;
      }).catch(function() {
        return caches.match(event.request).then(function(cached) {
          return cached || caches.match('/');
        });
      })
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then(function(cached) {
      return cached || fetch(event.request).then(function(response) {
        if (response && response.status === 200 && url.origin === self.location.origin) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(function(cache) {
            cache.put(event.request, clone).catch(function() {});
          });
        }
        return response;
      }).catch(function() {
        return caches.match('/');
      });
    })
  );
});

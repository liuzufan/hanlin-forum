// 翰林校园论坛 Service Worker v23
const CACHE_NAME = 'hanlin-v23';
const STATIC_ASSETS = [
  '/',
  '/css/style.css?v=22',
  '/js/app.js?v=23',
  '/manifest.json'
];

// API缓存策略：stale-while-revalidate
const API_CACHE_TTL = {
  '/api/posts': 3 * 60 * 1000,       // 帖子列表 3分钟
  '/api/categories': 60 * 60 * 1000,  // 分类 1小时
  '/api/announcements': 5 * 60 * 1000,// 公告 5分钟
  '/api/elections': 30 * 1000,        // 评选 30秒
  '/api/suggestions': 2 * 60 * 1000,  // 建议 2分钟
};

// 不缓存的API路径
const NO_CACHE_API = [
  '/api/auth/', '/api/translate', '/api/admin/',
  '/api/notifications', '/api/user/', '/api/profile/', '/api/favorites',
];

function shouldCacheAPI(pathname) {
  for (var i = 0; i < NO_CACHE_API.length; i++) {
    if (pathname.startsWith(NO_CACHE_API[i])) return false;
  }
  return true;
}

function getAPITTL(pathname) {
  for (var prefix in API_CACHE_TTL) {
    if (pathname.startsWith(prefix)) return API_CACHE_TTL[prefix];
  }
  if (pathname.match(/^\/api\/posts\/\d+$/)) return 2 * 60 * 1000;
  if (pathname.match(/^\/api\/posts\/\d+\/comments$/)) return 2 * 60 * 1000;
  return 60 * 1000;
}

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
  var url = new URL(event.request.url);
  var isAPI = url.pathname.startsWith('/api/');
  var isTranslate = url.hostname.includes('translate.googleapis.com') || url.hostname.includes('mymemory.translated.net');

  // 翻译API不缓存
  if (isTranslate) {
    event.respondWith(fetch(event.request));
    return;
  }

  // API请求：stale-while-revalidate
  if (isAPI && shouldCacheAPI(url.pathname)) {
    var cacheKey = 'api:' + url.pathname + url.search;
    event.respondWith(
      caches.open(CACHE_NAME).then(function(cache) {
        return cache.match(cacheKey).then(function(cachedResponse) {
          var fetchPromise = fetch(event.request).then(function(response) {
            if (response && response.status === 200) {
              var clone = response.clone();
              cache.put(cacheKey, clone);
            }
            return response;
          }).catch(function() {
            return cachedResponse || new Response('{"error":"网络不可用"}', { status: 503, headers: { 'Content-Type': 'application/json' } });
          });

          // 如果有缓存且未过期，返回缓存；否则返回网络请求
          if (cachedResponse) {
            var cachedDate = cachedResponse.headers.get('date');
            var age = cachedDate ? Date.now() - new Date(cachedDate).getTime() : Infinity;
            var ttl = getAPITTL(url.pathname);
            if (age < ttl) {
              // 缓存新鲜，直接返回（后台仍刷新）
              fetchPromise.catch(function() {});
              return cachedResponse;
            }
            // 缓存过期，返回缓存但后台刷新
            return cachedResponse;
          }
          return fetchPromise;
        });
      })
    );
    return;
  }

  // 非缓存API直接透传
  if (isAPI) {
    event.respondWith(fetch(event.request));
    return;
  }

  // 静态资源：cache-first
  event.respondWith(
    caches.match(event.request).then(function(cached) {
      return cached || fetch(event.request).then(function(response) {
        if (response && response.status === 200 && url.origin === self.location.origin) {
          var clone = response.clone();
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

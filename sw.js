// Service Worker for Void Blog - Enhanced for Mobile/PWA
const CACHE_NAME = 'voidblog-mobile-v1';
const urlsToCache = [
  '/',
  '/assets/css/style.css',
  '/assets/js/features.js',
  '/assets/js/search.js',
  '/assets/js/landing-splash.js',
  '/assets/js/page-loader.js',
  '/assets/js/mobile-menu.js',
  '/assets/js/touch-enhancements.js',
  '/assets/js/report-features.js',
  '/manifest.json',
  '/assets/icons/icon.svg'
];

// Install service worker and cache resources
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
      .catch(function(err) {
        console.log('Cache addAll failed:', err);
      })
  );
});

// Fetch from cache, fallback to network
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }

        // Clone the request
        const fetchRequest = event.request.clone();

        return fetch(fetchRequest).then(
          function(response) {
            // Check if we received a valid response
            // Allow both 'basic' and 'cors' types for CDN/cross-origin resources
            if (!response || response.status !== 200 || 
                (response.type !== 'basic' && response.type !== 'cors')) {
              return response;
            }

            // Clone the response
            const responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(function(cache) {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      })
  );
});

// Clean up old caches
self.addEventListener('activate', function(event) {
  const cacheWhitelist = [CACHE_NAME];
  
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

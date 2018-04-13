let cacheName = 'v1.01';
let cacheFiles = ['./', './index.html', './styles.css', 'bundle.js'];

self.addEventListener('install', (e) => {
  console.log('[ServiceWorker] Installed');
  e.waitUntil(
    caches.open(cacheName).then((cache) => {
      console.log('[ServiceWorker] Caching cacheFiles');
      return cache.addAll(cacheFiles);
    })
  );
});

self.addEventListener('activate', (e) => {
  console.log('[ServiceWorker] Activated');
  e.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((thisCacheName) => {
          if (thisCachename !== cacheName) {
            console.log(
              '[ServiceWorker] Removing Cached Files from ',
              thisCacheName
            );
            return caches.delete(thisCacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', (e) => {
  console.log('[ServiceWorker] Fetching', e.request.url);
});

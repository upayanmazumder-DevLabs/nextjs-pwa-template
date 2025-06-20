const CACHE_NAME = "nextjs-pwa-template-v1";
const CORE_ASSETS = [
  "/",
  "/offline",
  "/manifest.json",
  "/icons/icon-16x16.webp",
  "/icons/icon-32x32.webp",
  "/icons/icon-48x48.webp",
  "/icons/icon-64x64.webp",
  "/icons/icon-72x72.webp",
  "/icons/icon-76x76.webp",
  "/icons/icon-96x96.webp",
  "/icons/icon-114x114.webp",
  "/icons/icon-120x120.webp",
  "/icons/icon-128x128.webp",
  "/icons/icon-144x144.webp",
  "/icons/icon-152x152.webp",
  "/icons/icon-180x180.webp",
  "/icons/icon-192x192.webp",
  "/icons/icon-196x196.webp",
  "/icons/icon-228x228.webp",
  "/icons/icon-256x256.webp",
  "/icons/icon-384x384.webp",
  "/icons/icon-512x512.webp",
];

// Limit cache size
const limitCacheSize = (name, maxItems) => {
  caches.open(name).then((cache) =>
    cache.keys().then((keys) => {
      if (keys.length > maxItems) {
        cache.delete(keys[0]).then(() => limitCacheSize(name, maxItems));
      }
    })
  );
};

// On install: cache core assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(CORE_ASSETS);
    })
  );
  self.skipWaiting();
});

// On activate: clean up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key !== CACHE_NAME)
            .map((key) => caches.delete(key))
        )
      )
  );
  self.clients.claim();
});

// Intercept fetch requests
self.addEventListener("fetch", (event) => {
  const { request } = event;

  // Only cache GET requests, not APIs or devtools
  if (
    request.method !== "GET" ||
    request.url.includes("/api") ||
    request.url.includes("chrome-extension") ||
    request.url.startsWith("chrome")
  ) {
    return;
  }

  // Try cache first, then network
  event.respondWith(
    caches.match(request).then((cacheRes) => {
      return (
        cacheRes ||
        fetch(request)
          .then((fetchRes) => {
            // Clone and store in cache
            return caches.open(CACHE_NAME).then((cache) => {
              // Skip cross-origin and non-static responses
              if (
                request.url.startsWith(self.location.origin) &&
                !request.url.includes("/api")
              ) {
                cache.put(request.url, fetchRes.clone());
                limitCacheSize(CACHE_NAME, 50);
              }
              return fetchRes;
            });
          })
          .catch(() => {
            if (request.headers.get("accept")?.includes("text/html")) {
              return caches.match("/offline");
            }
          })
      );
    })
  );
});

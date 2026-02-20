const CACHE_NAME = "trader-pro-v1";
const urlsToCache = [
  "/Calculadora-trader/",
  "/Calculadora-trader/index.html",
  "/Calculadora-trader/manifest.json",
  "/Calculadora-trader/icon-192.png",
  "/Calculadora-trader/icon-512.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

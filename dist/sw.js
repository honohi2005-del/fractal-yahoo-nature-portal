const CACHE_NAME = "information-forest-v25";
const APP_SHELL = [
  "./",
  "./index.html",
  "./styles.css",
  "./app.js",
  "./forest-images.json",
  "./latest-news.json",
  "./manifest.webmanifest",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/icon-192.svg",
  "./icons/icon-512.svg",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key)),
      ))
      .then(() => self.clients.claim()),
  );
});

async function networkFirst(request, fallback = "./index.html") {
  try {
    const response = await fetch(request);
    if (response.ok && new URL(request.url).origin === self.location.origin) {
      const cache = await caches.open(CACHE_NAME);
      await cache.put(request, response.clone());
    }
    return response;
  } catch {
    return caches.match(request).then((cached) => cached || caches.match(fallback));
  }
}

async function cacheFirst(request) {
  const cached = await caches.match(request);
  if (cached) return cached;
  const response = await fetch(request);
  if (response.ok && new URL(request.url).origin === self.location.origin) {
    const cache = await caches.open(CACHE_NAME);
    await cache.put(request, response.clone());
  }
  return response;
}

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  const sameOrigin = url.origin === self.location.origin;

  if (request.mode === "navigate") {
    event.respondWith(networkFirst(request));
    return;
  }

  if (sameOrigin && url.pathname.endsWith("/forest-images.json")) {
    event.respondWith(cacheFirst(request));
    return;
  }

  if (sameOrigin && url.pathname.endsWith("/latest-news.json")) {
    event.respondWith(networkFirst(request, "./latest-news.json"));
    return;
  }

  if (sameOrigin) {
    event.respondWith(cacheFirst(request));
    return;
  }

  if (request.destination === "image") {
    event.respondWith(
      caches.match(request).then((cached) => cached || fetch(request).then(async (response) => {
        const cache = await caches.open(CACHE_NAME);
        await cache.put(request, response.clone());
        return response;
      })),
    );
  }
});
